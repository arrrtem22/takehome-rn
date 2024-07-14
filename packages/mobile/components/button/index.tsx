import React from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import { IProps } from "./model";
import style from "./style";

const CustomButton: React.FC<IProps> = (props) => {
  if (props.disabled) {
    return (
      <View style={[style.button, style.buttonDisabled]}>
        <Text style={[style.buttonText, style.buttonTextDisabled]}>
          {props.title}
        </Text>
      </View>
    );
  }

  return Platform.OS === "android" ? (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={style.button}>
        <Text style={style.buttonText}>{props.title}</Text>
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={props.onPress}>
      <View style={style.button}>
        <Text style={style.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
