import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";

import loginReducer from "./ducks/loginReducer";

const rootReducer = combineReducers({
  login: loginReducer
});

export default createStore(rootReducer, applyMiddleware(promise));
