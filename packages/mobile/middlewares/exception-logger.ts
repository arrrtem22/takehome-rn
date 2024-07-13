import { AppAction } from "../actions";
import { Middleware } from "redux";

export const exceptionLoggerMiddleware: Middleware = () => next => (
	action: AppAction | any
) => {
	return next(action);
};
