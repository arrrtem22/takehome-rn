import AuthStorage from "../services/auth-storage";
import { AuthAction, AuthActionTypes } from "../actions/auth";
import { Middleware } from "redux";

export const authStorageMiddleware: Middleware = () => next => (
	action: unknown
) => {
	const typedAction = action as AuthAction;

	switch (typedAction.type) {
		case AuthActionTypes.LOG_IN_SUCCESS: {
			AuthStorage.setToken(typedAction.token);
			break;
		}
		case AuthActionTypes.REGISTER_SUCCESS: {
			AuthStorage.setToken(typedAction.token);
			break;
		}
	}
	return next(action);
};
