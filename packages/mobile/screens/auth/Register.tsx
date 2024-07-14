import React, { useState, useRef } from 'react';
import { TextInput as TextInputNative, StyleSheet, View, Text } from 'react-native';
import colors from "../../styles/colors";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import Button from "../../components/button";
import TextInput from "../../components/text-input";
import { Dispatch } from "../../types";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

export interface IOwnProps { }

type RegisterScreenNavigationProp = NativeStackScreenProps<StackScreens, 'Register'>;

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
  RegisterScreenNavigationProp {
}

const RegisterScreen: React.FC<IProps> = ({ dispatch, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<RegisterScreenNavigationProp['navigation']>();
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
    dispatch(register(username, password, navigateToWebView));
  };

  return (
    <View style={style.register}>
      <Text style={style.registerFormText}>
        Create a new user
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
        style={style.registerFormPassword}
        autoCorrect={false}
        inputRef={inputRefs.password}
        onSubmitEditing={logInHandler}
      />
      <View style={style.registerFormButton}>
        <Button title="Register" onPress={logInHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state: any): IStateProps => ({
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({ dispatch });

const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

export default Register;

const style = StyleSheet.create({
  register: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background.primary
  },
  registerFormText: {
    marginVertical: 20
  },
  registerFormPassword: {
    marginTop: 20
  },
  registerFormButton: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: 40
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});
