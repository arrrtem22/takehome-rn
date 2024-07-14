import { AsyncActionCreator } from "../types";
import { userService } from "../api/auth-api"
import axios from "axios";

export enum AuthActionTypes {
	LOG_IN_REQUEST = "LOG_IN_REQUEST",
	LOG_IN_SUCCESS = "LOG_IN_SUCCESS",
	LOG_IN_FAILURE = "LOG_IN_FAILURE",
	REGISTER_REQUEST = "REGISTER_REQUEST",
	REGISTER_SUCCESS = "REGISTER_SUCCESS",
	REGISTER_FAILURE = "REGISTER_FAILURE",
}

export type AuthAction =
	| ReturnType<LogInRequest>
	| ReturnType<LogInSuccess>
	| ReturnType<LogInFailure>
	| ReturnType<RegisterRequest>
	| ReturnType<RegisterSuccess>
	| ReturnType<RegisterFailure>;

// Log In

export type LogInRequest = () => {
	type: AuthActionTypes.LOG_IN_REQUEST;
};

export type LogInSuccess = (
	token: string
) => {
	type: AuthActionTypes.LOG_IN_SUCCESS;
	token: string;
};

export type LogInFailure = (
	error: string
) => {
	type: AuthActionTypes.LOG_IN_FAILURE;
	error: string;
};

export const logInRequest: LogInRequest = () => ({
	type: AuthActionTypes.LOG_IN_REQUEST
});

export const logInSuccess: LogInSuccess = token => ({
	type: AuthActionTypes.LOG_IN_SUCCESS,
	token: token
});

export const logInFailure: LogInFailure = error => ({
	type: AuthActionTypes.LOG_IN_FAILURE,
	error: error
});

export const logIn: AsyncActionCreator = (
	username: string,
	password: string,
	navigateCallback: () => void
) => {
	return async (dispatch) => {
		dispatch(logInRequest());
		try {
			const token = await userService.login(username, password)
			dispatch(logInSuccess(token));
			navigateCallback();
		} catch (e) {
			let errorMessage = 'An unknown error occurred';

			if (axios.isAxiosError(e)) {
				if (e.response) {
					errorMessage = e.response.data.message || e.response.statusText;
				}
			} else if (e instanceof Error) {
				errorMessage = e.message;
			}

			dispatch(logInFailure(errorMessage));
		}
	};
};

// Register

export type RegisterRequest = () => {
	type: AuthActionTypes.REGISTER_REQUEST;
};

export type RegisterSuccess = (
	token: string
) => {
	type: AuthActionTypes.REGISTER_SUCCESS;
	token: string;
};

export type RegisterFailure = (
	error: string
) => {
	type: AuthActionTypes.REGISTER_FAILURE;
	error: string;
};

export const registerRequest: RegisterRequest = () => ({
	type: AuthActionTypes.REGISTER_REQUEST
});

export const registerSuccess: RegisterSuccess = token => ({
	type: AuthActionTypes.REGISTER_SUCCESS,
	token: token
});

export const registerFailure: RegisterFailure = error => ({
	type: AuthActionTypes.REGISTER_FAILURE,
	error: error
});

export const register: AsyncActionCreator = (
	username: string,
	password: string,
	navigateCallback: () => void
) => {
	return async (dispatch) => {
		dispatch(registerRequest());
		try {
			const token = await userService.register(username, password)
			dispatch(registerSuccess(token));
			navigateCallback();
		} catch (e) {
			let errorMessage = 'An unknown error occurred';

			if (axios.isAxiosError(e)) {
				if (e.response) {
					errorMessage = e.response.data.message || e.response.statusText;
				}
			} else if (e instanceof Error) {
				errorMessage = e.message;
			}

			dispatch(registerFailure(errorMessage));
		}
	};
};