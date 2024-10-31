import { configureStore } from "@reduxjs/toolkit";

import overviewReducer from "./Pages/overview/overviewSlice";

import potReducer from "./Pages/pots/potSlice";
import modalReducer from "./ui/modalSlice";
import recurringReducer from "./Pages/recurringBills/recurringSlice";
import budgetReducer from "./Pages/budgets/budgetSlice";
import authReducer from "../backend/data/authSlice";

import transactionReducer from "./Pages/transactions/transactionSlice";
const store = configureStore({
  reducer: {
    overview: overviewReducer,
    pots: potReducer,
    modal: modalReducer,
    recurring: recurringReducer,
    budget: budgetReducer,
    transactions: transactionReducer,
    auth: authReducer,
  },
});

export default store;
