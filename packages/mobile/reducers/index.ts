import { combineReducers } from "redux";
import { IAppState } from "../models";
import { AppAction } from "../actions";
import auth from "./auth";

const reducer = combineReducers({
	auth
});

export default reducer;
