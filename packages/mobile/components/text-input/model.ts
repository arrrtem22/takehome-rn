import { KeyboardTypeOptions, StyleProp } from "react-native";
import { Component } from "react";

import { TextInput as TextInputNative} from "react-native";
export interface IProps {
	onChangeText: (value: string) => any;
	onSubmitEditing: () => any;
	inputRef: React.Ref<TextInputNative>;
	value: string;
	label: string;
	keyboardType?: KeyboardTypeOptions;
	autoCorrect?: boolean;
	secureTextEntry?: boolean;
	style?: StyleProp<any>;
}

export interface IState {
	isFocused: boolean;
}
