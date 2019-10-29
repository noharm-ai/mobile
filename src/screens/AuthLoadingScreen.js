import React, { useEffect } from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";

export default props => {
  useEffect(() => {
    bootstrapAsync();
  }, []);

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const authData = await AsyncStorage.getItem("authData");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    props.navigation.navigate(authData ? "App" : "Auth");
  };

  // Render any loading content that you like here

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};
