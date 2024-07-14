import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from "redux-logger";
import reducer from "../reducers";
import { exceptionLoggerMiddleware } from "../middlewares/exception-logger";
import { authStorageMiddleware } from "../middlewares/auth-storage";

const loggerMiddleware = createLogger({
	level: "info"
});

const middleware = [exceptionLoggerMiddleware, authStorageMiddleware, loggerMiddleware];

export default () =>
	configureStore({
		reducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
	});
