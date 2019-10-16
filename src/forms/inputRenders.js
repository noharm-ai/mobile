import React from "react";
import { Switch } from "react-native";
import {
  Text,
  Item,
  Textarea,
  Picker,
  CheckBox,
  ListItem,
  View,
  Label,
  Input
} from "native-base";
import { TextInput } from "react-native-paper";

export const renderCheckbox = ({ input, label }) => (
  <ListItem button onPress={() => input.onChange(!input.value)}>
    <CheckBox {...input} checked={input.value ? true : false} />
    <Text> {label} </Text>
  </ListItem>
);

export const renderSwitch = ({ input, label }) => (
  <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
    <Text style={{ flex: 2 }}> {label} </Text>

    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Switch
        {...input}
        value={input.value}
        onChange={() => input.onChange(!input.value)}
      />
    </View>
  </View>
);

export const ErrorMessage = props => (
  <Text
    style={{
      color: "red",
      alignSelf: "flex-end",
      marginBottom: 5,
      marginTop: 3,
      ...props.style
    }}
  >
    {props.error}
  </Text>
);

export const renderSelect = ({
  input,
  label,
  children,
  meta: { touched, error },
  ...custom
}) => (
  <View style={{ flex: 1 }}>
    <Item picker error={touched && error != null}>
      <Picker
        {...input}
        selectedValue={input.value}
        onValueChange={value => input.onChange(value)}
        children={children}
        {...custom}
      />
    </Item>
    {touched && error && <ErrorMessage error={error} />}
  </View>
);

export const renderTextarea = ({
  input,
  meta: { touched, error },
  style,
  ...custom
}) => {
  if (touched && error != null) {
    style.borderColor = "red";
  }

  return (
    <View>
      <Textarea
        value={input.value}
        onChangeText={text => input.onChange(text)}
        style={style}
        {...custom}
      />
      {touched && error && <ErrorMessage error={error} />}
    </View>
  );
};

export const renderInput = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <View>
    <Item stackedLabel error={touched && error != null}>
      <Label>{label}</Label>
      <Input
        value={input.value}
        onChangeText={text => input.onChange(text)}
        {...custom}
      />
    </Item>
    {touched && error && <ErrorMessage error={error} />}
  </View>
);

export const renderPaperInput = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <View>
    <TextInput
      label={label}
      value={input.value}
      onChangeText={text => input.onChange(text)}
      error={touched && error}
      {...custom}
    />
    {touched && error && <ErrorMessage error={error} />}
  </View>
);
