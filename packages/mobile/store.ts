import { applyMiddleware, compose } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./reducers";
import { exceptionLoggerMiddleware } from "./middlewares/exception-logger";
import { authStorageMiddleware } from "./middlewares/auth-storage";
import { IAppState } from "./models";
import { AppAction } from "./actions";

const loggerMiddleware = createLogger({
	level: "info"
});

const middleware = [exceptionLoggerMiddleware, authStorageMiddleware, loggerMiddleware];

export default () =>
	configureStore({
		reducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
	});
