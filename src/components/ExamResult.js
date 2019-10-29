import React from "react";
import { StyleSheet } from "react-native";
import { Card, CardItem, Body, Text } from "native-base";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default ({ exam, value, fill, color }) => {
  return (
    <Card style={styles.card}>
      <CardItem style={styles.cardItem}>
        <Body style={{ alignItems: "center" }}>
          <AnimatedCircularProgress
            size={60}
            width={5}
            fill={fill}
            tintColor={color}
          >
            {fill => <Text>{value}</Text>}
          </AnimatedCircularProgress>
          <Text style={{ marginTop: 5, fontSize: 13 }}>{exam}</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 110,
    marginRight: 5
  },
  cardItem: {
    marginHorizontal: 5,
    alignItems: "center"
  }
});
