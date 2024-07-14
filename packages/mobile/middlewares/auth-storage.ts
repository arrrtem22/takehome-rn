import AuthStorage from "../services/auth-storage";
import { AuthAction, AuthActionTypes } from "../actions/auth";
import { Middleware } from "redux";

export const authStorageMiddleware: Middleware = () => next => (
	action: AuthAction | any
) => {
	switch (action.type) {
		case AuthActionTypes.LOG_IN_SUCCESS: {
			AuthStorage.setToken(action.token);
			break;
		}
		case AuthActionTypes.REGISTER_SUCCESS: {
			AuthStorage.setToken(action.token);
			break;
		}
	}
	return next(action);
};
