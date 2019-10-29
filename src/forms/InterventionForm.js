import React from "react";
import { Field, reduxForm, change } from "redux-form";
import { Text, Form, Picker, Icon, Button, Spinner, Toast } from "native-base";
import { renderSelect, renderSwitch, renderTextarea } from "./inputRenders";
import { post } from "../services/api";
import NavigationService from "../services/NavigationService";

let InterventionForm = props => {
  const { handleSubmit, submitting } = props;

  const submit = async values => {
    let intervention = {
      idPrescriptionDrug: values.idPrescriptionDrug,
      idInterventionReason: values.idInterventionReason,
      observation: values.observation,
      propagation: "N"
    };

    if (values.propagation != null) {
      intervention.propagation = values.propagation ? "S" : "N";
    }
    const response = await post("intervention", intervention, false);

    if (response.status === "success") {
      Toast.show({
        text: "Intervenção registrada!",
        type: "success",
        duration: 3000,
        buttonText: "Ok"
      });
      NavigationService.goBack();
    } else {
      Toast.show({
        text: response.message,
        type: "danger",
        duration: 3000,
        buttonText: "Ok"
      });
    }
  };

  props.dispatch(
    change("interventionForm", "idPrescriptionDrug", props.idPrescriptionDrug)
  );

  return (
    <Form style={{ marginTop: 15, paddingHorizontal: 10 }}>
      <Field
        name="idInterventionReason"
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        component={renderSelect}
        placeholder="Selecione o motivo da intervenção"
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
      >
        <Picker.Item label="Selecione o motivo da intervenção" value="" />
        {props.interventionReasons.map(ir => (
          <Picker.Item key={ir.id} label={ir.description} value={ir.id} />
        ))}
      </Field>

      <Field
        name="observation"
        rowSpan={5}
        bordered
        placeholder="Observações"
        style={{ marginTop: 15 }}
        component={renderTextarea}
      />

      <Field name="propagation" label="Propagação" component={renderSwitch} />

      <Button
        block
        rounded
        onPress={handleSubmit(submit, props.idPrescription)}
        style={{ marginTop: 25 }}
      >
        {submitting ? <Spinner /> : <Text>Salvar</Text>}
      </Button>
    </Form>
  );
};

InterventionForm = reduxForm({
  form: "interventionForm",
  validate: values => {
    const errors = {};

    if (!values.idInterventionReason) {
      errors.idInterventionReason = "Preenchimento obrigatório";
    }

    if (!values.observation) {
      errors.observation = "Preenchimento obrigatório";
    }

    return errors;
  }
})(InterventionForm);

export default InterventionForm;
