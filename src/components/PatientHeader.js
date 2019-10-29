import React from "react";
import { View, Text } from "native-base";
import Moment from "moment";
import PatientAvatar from "./PatientAvatar";

export default props => {
  return (
    <View style={{ marginTop: 10, alignItems: "center" }}>
      <PatientAvatar score={props.patient.prescriptionScore} large aggregated />
      <View style={{ alignItems: "center", marginTop: 5 }}>
        <Text style={{ fontSize: 20 }}>{props.patient.name}</Text>
        <Text note>Risco da prescrição: {props.patient.prescriptionScore}</Text>
        <Text note>
          {Moment(props.patient.date).format("DD/MM/YYYY HH:mm")}
        </Text>
      </View>
    </View>
  );
};
