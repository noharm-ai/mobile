import React from "react";
import { AsyncStorage } from "react-native";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { Form } from "native-base";
import { Button } from "react-native-paper";
import { renderPaperInput, ErrorMessage } from "app/src/forms/inputRenders";
import { post } from "app/src/services/api";
import NavigationService from "app/src/services/NavigationService";
import theme from "app/src/native-base-theme/variables/material";

let SignInForm = props => {
  const { handleSubmit, submitting, error } = props;

  const submit = async values => {
    const response = await post("authenticate", values, false);

    if (response.status === "success") {
      let authData = {
        name: response.userName,
        access_token: response.access_token,
        refresh_token: response.refresh_token
      };

      await AsyncStorage.setItem("authData", JSON.stringify(authData));
      NavigationService.navigate("App");
    } else {
      throw new SubmissionError({
        _error: response.message
      });
    }
  };

  return (
    <Form>
      <Field
        name="email"
        label="E-mail"
        component={renderPaperInput}
        rounded
        style={{ backgroundColor: "#FFFFFF" }}
      />

      <Field
        name="password"
        label="Senha"
        secureTextEntry={true}
        component={renderPaperInput}
        style={{
          backgroundColor: "#FFFFFF",
          marginTop: 15,
          marginBottom: 25
        }}
      />

      {error && <ErrorMessage error={error} style={{ alignSelf: "center" }} />}

      <Button
        onPress={handleSubmit(submit)}
        color={theme.brandPrimary}
        style={{ borderRadius: 20 }}
        contentStyle={{ height: 45 }}
        mode="contained"
        loading={submitting}
      >
        Acessar
      </Button>
    </Form>
  );
};

SignInForm = reduxForm({
  form: "signInForm",
  validate: values => {
    const errors = {};

    if (!values.email) {
      errors.email = "Preenchimento obrigatório";
    }

    if (!values.password) {
      errors.password = "Preenchimento obrigatório";
    }

    return errors;
  }
})(SignInForm);

export default SignInForm;
