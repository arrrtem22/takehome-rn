import React from "react";
import { TextInput as TextInputNative, View, Animated, TextStyle } from "react-native";
import { IProps, IState } from "./model";
import style from "./style";
import colors from "../../styles/colors";

export default class TextInput extends React.Component<IProps, IState> {
    isFocusedAnimation: Animated.Value;

    constructor(props: IProps) {
        super(props);
        this.state = {
            isFocused: false
        };
        this.isFocusedAnimation = new Animated.Value(this.props.value === "" ? 0 : 1);
    }

    componentDidMount() {
        this.handleFocusAnimation();
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.value !== this.props.value || prevProps.value === "") {
            this.handleFocusAnimation();
        }
    }

    handleFocusAnimation = () => {
        Animated.timing(this.isFocusedAnimation, {
            toValue: this.state.isFocused || this.props.value !== "" ? 1 : 0,
            duration: 100,
            useNativeDriver: false,
        }).start();
    };

    handleFocus = () => this.setState({ isFocused: true }, this.handleFocusAnimation);

    handleBlur = () => this.setState({ isFocused: false }, this.handleFocusAnimation);

    render() {
        const textInputLabel: Animated.WithAnimatedObject<TextStyle> = {
            position: "absolute",
            left: 0,
            top: this.isFocusedAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [25, 0]
            }),
            fontSize: this.isFocusedAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 12]
            }),
            color: this.isFocusedAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [colors.text.secondary, colors.text.primary]
            })
        };

        const {
            onChangeText,
            keyboardType,
            autoCorrect,
            secureTextEntry,
            onSubmitEditing,
            value,
            label,
			inputRef,
        } = this.props;

        return (
            <View style={[style.textInput, this.props.style]}>
                <Animated.Text style={textInputLabel}>
                    {label.toUpperCase()}
                </Animated.Text>
                <TextInputNative
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    style={[style.textInputNative]}
                    onChangeText={onChangeText}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    keyboardType={keyboardType ? keyboardType : "default"}
                    autoCorrect={autoCorrect ? autoCorrect : true}
                    secureTextEntry={secureTextEntry}
                    onSubmitEditing={onSubmitEditing}
                    value={value}
					ref={inputRef}
                />
            </View>
        );
    }
}
