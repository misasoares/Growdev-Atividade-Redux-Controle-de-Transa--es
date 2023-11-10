import { combineReducers } from "@reduxjs/toolkit";
import transactionsSlice from "./transactions/transactionsSlice";

export default combineReducers({
  transactions: transactionsSlice,
});
