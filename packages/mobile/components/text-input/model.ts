import { KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native";

import { TextInput as TextInputNative} from "react-native";
export interface IProps {
	onChangeText: (value: string) => void;
	onSubmitEditing: () => void;
	inputRef: React.Ref<TextInputNative>;
	value: string;
	label: string;
	keyboardType?: KeyboardTypeOptions;
	autoCorrect?: boolean;
	secureTextEntry?: boolean;
	style?: StyleProp<ViewStyle> | undefined;
}

export interface IState {
	isFocused: boolean;
}
