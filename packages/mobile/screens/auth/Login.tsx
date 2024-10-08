import React, { useState, useRef } from 'react';
import { TextInput as TextInputNative, StyleSheet, View, Text } from 'react-native';
import colors from "../../styles/colors";
import { connect } from "react-redux";
import { logIn } from "../../actions/auth";
import Button from "../../components/button";
import TextInput from "../../components/text-input";
import { Dispatch } from "../../types";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { IAppState } from '../../models';

export interface IOwnProps { }

type LoginScreenNavigationProp = NativeStackScreenProps<StackScreens, 'Login'>;

export interface IStateProps {
	error: string | null;
}

export interface IDispatchProps {
	dispatch: Dispatch;
}

export interface IProps
	extends IOwnProps,
	IStateProps,
	IDispatchProps,
	LoginScreenNavigationProp {
}

const LoginScreen: React.FC<IProps> = ({ dispatch, error }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation<LoginScreenNavigationProp['navigation']>();
	const inputRefs = {
		username: useRef<TextInputNative>(null),
		password: useRef<TextInputNative>(null),
	};

	const onChangeUsername = (value: string) => {
		setUsername(value);
	};

	const onChangePassword = (value: string) => {
		setPassword(value);
	};

	const navigateToWebView = useCallback(() => navigation.navigate('App'), [navigation?.navigate]);

	const logInHandler = () => {
		dispatch(logIn(username, password, navigateToWebView));
	};

	return (
		<View style={style.login}>
			<Text style={style.loginFormText}>
				Log in with your personal account.
			</Text>
			{error && <Text style={style.errorText}>{error}</Text>}
			<TextInput
				label="username"
				value={username}
				onChangeText={onChangeUsername}
				autoCorrect={false}
				inputRef={inputRefs.username}
				onSubmitEditing={() => inputRefs.password.current?.focus()}
			/>
			<TextInput
				label="password"
				value={password}
				onChangeText={onChangePassword}
				secureTextEntry={true}
				style={style.loginFormPassword}
				autoCorrect={false}
				inputRef={inputRefs.password}
				onSubmitEditing={logInHandler}
			/>
			<View style={style.loginFormButton}>
				<Button title="Log In" onPress={logInHandler} />
			</View>
		</View>
	);
};

const mapStateToProps = (state: IAppState): IStateProps => ({
	error: state.auth.error,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({ dispatch });

const ConnectedLoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

export default ConnectedLoginScreen;

const style = StyleSheet.create({
	login: {
		flex: 1,
		padding: 20,
		backgroundColor: colors.background.primary
	},
	loginFormText: {
		marginVertical: 20
	},
	loginFormPassword: {
		marginTop: 20
	},
	loginFormButton: {
		flex: 1,
		alignItems: "flex-end",
		marginTop: 40
	},
	errorText: {
		color: 'red',
		marginBottom: 20,
	},
});
