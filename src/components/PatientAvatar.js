import React from "react";
import { StyleSheet, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default props => {
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
  const width = props.large ? 70 : 40;
  const borderRadius = width / 2;
  let avatarStyle;

  if (props.user) {
    avatarStyle = styles.user;
  } else {
    avatarStyle = props.aggregated
      ? getAggregatedScoreStyle(score)
      : getScoreStyle(score);
  }

  avatarStyle = {
    ...avatarStyle,
    width: width,
    height: width,
    borderRadius: borderRadius
  };

  return (
    <View style={avatarStyle}>
      <AnimatedCircularProgress
        size={width}
        width={5}
        fill={100}
        tintColor={avatarStyle.color}
      />
    </View>
  );
};

let styles = StyleSheet.create({
  danger: {
    color: "#f44336",
    backgroundColor: "rgba(244, 67, 54, .6)"
  },
  alert: {
    color: "#FFC107",
    backgroundColor: "rgba(255, 193, 7, .6)"
  },
  warning: {
    color: "#fdd835",
    backgroundColor: "rgba(255, 235, 59, .6)"
  },
  default: {
    color: "#8BC34A",
    backgroundColor: "rgba(139, 195, 74, .6)"
  },
  user: {
    color: "#FFFFFF",
    backgroundColor: "rgba(255, 255, 255, .6)"
  }
});
