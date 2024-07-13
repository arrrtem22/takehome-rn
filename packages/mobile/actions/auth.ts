import { AsyncActionCreator } from "../types";
import { userService } from "../api/auth"
import axios from "axios";

export enum AuthActionTypes {
	LOG_IN_REQUEST = "LOG_IN_REQUEST",
	LOG_IN_SUCCESS = "LOG_IN_SUCCESS",
	LOG_IN_FAILURE = "LOG_IN_FAILURE",
}

export type AuthAction =
	| ReturnType<LogInRequest>
	| ReturnType<LogInSuccess>
	| ReturnType<LogInFailure>;

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

export const logIn: AsyncActionCreator = (username: string, password: string) => {
	return async (dispatch) => {
		dispatch(logInRequest());
		try {
			const token = await userService.login(username, password)
			dispatch(logInSuccess(token));
			// NavigationService.navigate("App");
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
			console.log('Error:', errorMessage);
		}
	};
};