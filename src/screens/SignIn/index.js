import React from "react";
import { StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "native-base";
import SignInForm from "./form";

export default () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgb(132, 220, 193)", "rgb(0, 188, 215)"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }}
      />
      <Image
        source={require("app/assets/logo_transparent.png")}
        style={{
          height: 80,
          width: null,
          resizeMode: "contain",
          marginBottom: 25
        }}
      />
      <View style={styles.formContainer}>
        <SignInForm
          initialValues={{ email: "teste@teste.com.br", password: "1234" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 15
  },
  formContainer: {
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: 10
  }
});
