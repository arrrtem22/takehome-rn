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
		case AuthActionTypes.LOG_OUT_SUCCESS: {
			AuthStorage.removeToken();
			break;
		}
		case AuthActionTypes.SESSION_EXPIRED: {
			AuthStorage.removeToken();
			break;
		}
	}
	return next(action);
};
