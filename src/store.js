import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
        loanPurpose: "",
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "But a car" },
// });

// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

//Action Creators

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

// root reducer

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

store.dispatch(deposit(1000));
console.log(store.getState());
store.dispatch(withdraw(129));
console.log(store.getState());
store.dispatch(requestLoan(2000, "buy a car"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer("John doe", "999777666"));

console.log(store.getState().customer);
store.dispatch(updateName("doe"));
console.log(store.getState());
