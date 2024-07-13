import { AsyncActionCreator, SyncActionCreator, Dispatch } from "../types";
import { userService } from "../api/auth"
import { AxiosError } from "axios"

export enum AuthActionTypes {
	LOG_IN_REQUEST = "LOG_IN_REQUEST",
	LOG_IN_SUCCESS = "LOG_IN_SUCCESS",
	LOG_IN_FAILURE = "LOG_IN_FAILURE",
	LOG_IN_FROM_STORAGE = "LOG_IN_FROM_STORAGE",
	LOG_OUT_REQUEST = "LOG_OUT_REQUEST",
	LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS",
	LOG_OUT_FAILURE = "LOG_OUT_FAILURE",
	SESSION_EXPIRED = "SESSION_EXPIRED",
}

const api = (dispatch: Dispatch) =>
	new Promise((resolve, reject) =>
		setTimeout(() => {
			const httpResponse200 = () => resolve(200);
			// const httpResponse401 = () =>
			// dispatch(sessionExpired()) && reject("Session Expired");
			return httpResponse200();
			//return httpResponse401();
		}, 200)
	);

export type AuthAction =
	| ReturnType<LogInRequest>
	| ReturnType<LogInSuccess>
	| ReturnType<LogInFailure>
	| ReturnType<LogInFromStorage>
	| ReturnType<LogOutRequest>
	| ReturnType<LogOutSuccess>
	| ReturnType<LogOutFailure>
	| ReturnType<SessionExpired>;

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
	return async (dispatch, getState) => {
		dispatch(logInRequest());
		try {
			const token = await userService.login(username, password)
			dispatch(logInSuccess(token));
			// NavigationService.navigate("App");
		} catch (e: AxiosError | any) {
			let errorMessage = 'An unknown error occurred';

			if (e.isAxiosError && e.response) {
				errorMessage = e.response.data.message || e.response.statusText;
			} else if (e.message) {
				errorMessage = e.message;
			}

			dispatch(logInFailure(errorMessage));
			console.log('Error:', errorMessage);
		}
	};
};

// Log In From Storage

export type LogInFromStorage = (
	token: string
) => {
	type: AuthActionTypes.LOG_IN_FROM_STORAGE;
	token: string;
};

export const logInFromStorage: LogInFromStorage = token => ({
	type: AuthActionTypes.LOG_IN_FROM_STORAGE,
	token: token
});

// Log Out

export type LogOutRequest = () => {
	type: AuthActionTypes.LOG_OUT_REQUEST;
};

export type LogOutSuccess = () => {
	type: AuthActionTypes.LOG_OUT_SUCCESS;
};

export type LogOutFailure = (
	error: string
) => {
	type: AuthActionTypes.LOG_OUT_FAILURE;
	error: string;
};

export const logOutRequest: LogOutRequest = () => ({
	type: AuthActionTypes.LOG_OUT_REQUEST
});

export const logOutSuccess: LogOutSuccess = () => ({
	type: AuthActionTypes.LOG_OUT_SUCCESS
});

export const logOutFailure: LogOutFailure = error => ({
	type: AuthActionTypes.LOG_OUT_FAILURE,
	error: error
});

export const logOut: AsyncActionCreator = () => {
	return async (dispatch, getState) => {
		dispatch(logOutRequest());
		try {
			await api(dispatch);
			dispatch(logOutSuccess());
			// NavigationService.navigate("Auth");
			console.log('asd')
		} catch (e) {
			// dispatch(logOutFailure(e.message || e));
			console.log('qwe')
		}
	};
};

// Session Expired

export type SessionExpired = () => {
	type: AuthActionTypes.SESSION_EXPIRED;
};

export const _sessionExpired: SessionExpired = () => ({
	type: AuthActionTypes.SESSION_EXPIRED
});

export const sessionExpired: SyncActionCreator = () => {
	return (dispatch, getState) => {
		dispatch(_sessionExpired());
		// NavigationService.navigate("Auth");
	};
};
