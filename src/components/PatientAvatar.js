import React from "react";
import { StyleSheet, View } from "react-native";

export default function PatientAvatar(props) {
  function getAggregatedScoreStyle(score) {
    if (score < 5) {
      return styles.default;
    }

    if (score >= 5 && score <= 7) {
      return styles.warning;
    }

    return styles.danger;
  }

  function getScoreStyle(score) {
    if (score === 0) {
      return styles.default;
    }

    if (score === 1) {
      return styles.warning;
    }

    if (score === 2) {
      return styles.alert;
    }

    return styles.danger;
  }

  const score = parseInt(props.score, 10);
  let avatarStyle = props.aggregated
    ? getAggregatedScoreStyle(score)
    : getScoreStyle(score);

  if (props.large) {
    avatarStyle = {
      ...avatarStyle,
      width: 50,
      height: 50,
      borderRadius: 30
    };
  }

  return <View style={avatarStyle} />;
}

let baseAvatar = {
  width: 40,
  height: 40,
  borderRadius: 20
};

let styles = StyleSheet.create({
  danger: {
    ...baseAvatar,
    backgroundColor: "#f44336"
  },
  alert: {
    ...baseAvatar,
    backgroundColor: "#FFC107"
  },
  warning: {
    ...baseAvatar,
    backgroundColor: "#FFEB3B"
  },
  default: {
    ...baseAvatar,
    backgroundColor: "#8BC34A"
  }
});
