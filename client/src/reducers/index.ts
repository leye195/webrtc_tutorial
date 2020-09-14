import { combineReducers } from "redux";
import user from "./user";
const rootReducer = combineReducers({
  user,
});
export type rootState = ReturnType<typeof rootReducer>;
export default rootReducer;
