import { AppAction } from "../actions";
import { Middleware } from "redux";

export const exceptionLoggerMiddleware: Middleware = () => next => (
	action: AppAction | any
) => {
	try {
		return next(action);
	} catch (exception) {
		throw exception;
	}
};
