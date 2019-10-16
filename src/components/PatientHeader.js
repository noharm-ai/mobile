import React from "react";
import { View, Text } from "native-base";
import Moment from "moment";
import PatientAvatar from "./PatientAvatar";

export default function PatientHeader(props) {
  return (
    <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 7 }}>
      <PatientAvatar score={props.patient.prescriptionScore} large aggregated />
      <View style={{ marginLeft: 15, flex: 1 }}>
        <Text style={{ fontSize: 20 }}>{props.patient.name}</Text>
        <Text note>Risco da prescrição: {props.patient.prescriptionScore}</Text>
        <Text note>
          {Moment(props.patient.date).format("DD/MM/YYYY HH:mm")}
        </Text>
      </View>
    </View>
  );
}
