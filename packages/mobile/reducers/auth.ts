import { AuthAction, AuthActionTypes } from "../actions/auth";
import { IAuthState } from "../models/auth";


const initialAuthState: IAuthState = {
	logging: false,
	token: "",
	error: ""
};

export default function authReducer(
	state = initialAuthState,
	action: AuthAction
) {
	switch (action.type) {
		case AuthActionTypes.LOG_IN_REQUEST:
			return {
				...state,
				logging: true,
				error: ""
			};
		case AuthActionTypes.LOG_IN_SUCCESS:
			return {
				...state,
				logging: false,
				token: action.token
			};
		case AuthActionTypes.LOG_IN_FAILURE:
			return {
				...state,
				logging: false,
				error: action.error
			};
		case AuthActionTypes.REGISTER_REQUEST:
			return {
				...state,
				logging: true,
				error: ""
			};
		case AuthActionTypes.REGISTER_SUCCESS:
			return {
				...state,
				logging: false,
				token: action.token
			};
		case AuthActionTypes.REGISTER_FAILURE:
			return {
				...state,
				logging: false,
				error: action.error
			};
		default:
			return state;
	}
}
