import { TextInput as TextInputNative, StyleSheet, View, Text } from 'react-native';
import colors from "../../styles/colors";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { logIn } from "../../actions/auth";
import Button from "../../components/button";
import TextInput from "../../components/text-input";
import { Dispatch } from "../../types";

export interface IOwnProps { }

export interface IStateProps { }

export interface IDispatchProps {
	dispatch: Dispatch;
}

export interface IProps
	extends IOwnProps,
	IStateProps,
	IDispatchProps { }

export interface IState {
	username: string;
	password: string;
}

class LoginScreen extends Component<IProps, IState> {
	inputRef: { [key: string]: React.RefObject<TextInputNative> } = {
        username: createRef(),
        password: createRef(),
    };

	constructor(props: IProps) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};
	}

	onChangeEmail = (value: string) => {
		this.setState({
			username: value
		});
	};

	onChangePassword = (value: string) => {
		this.setState({
			password: value
		});
	};

	addInputRef = (id: string, ref: React.RefObject<TextInputNative>) => {
        this.inputRef[id] = ref;
    };

	logIn = () => this.props.dispatch(logIn(this.state.username, this.state.password));

	render() {
		return (
			<View style={style.login}>
				<Text style={style.loginFormText}>
					Log in with your personal account.
				</Text>
				<TextInput
					label="username"
					value={this.state.username}
					onChangeText={this.onChangeEmail}
					autoCorrect={false}
					inputRef={this.inputRef.username}
					onSubmitEditing={() => this.inputRef.password.current?.focus()}
				/>
				<TextInput
					label="password"
					value={this.state.password}
					onChangeText={this.onChangePassword}
					secureTextEntry={true}
					style={style.loginFormPassword}
					autoCorrect={false}
					inputRef={this.inputRef.password}
					onSubmitEditing={this.logIn}
				/>
				<View style={style.loginFormButton}>
					<Button title="Log In" onPress={this.logIn} />
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({ dispatch });

const ConnectedLoginScreen = connect(null, mapDispatchToProps)(LoginScreen);

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
	}
});
