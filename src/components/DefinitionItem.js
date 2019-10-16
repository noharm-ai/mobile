import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";

export default function DefinitionItem(props) {
  return (
    <View style={styles.definitionList}>
      <View style={styles.dlKey}>
        <Text style={styles.label}>{props.label}:</Text>
      </View>
      <View style={styles.dlValue}>
        <Text>{props.value}</Text>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  definitionList: {
    flex: 1,
    flexDirection: "row"
  },
  dlKey: {
    flex: 1
  },
  label: {
    alignSelf: "flex-end",
    marginRight: 10
  },
  dlValue: {
    flex: 2
  }
});
