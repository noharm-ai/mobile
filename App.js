import React from "react";
import { StatusBar } from "react-native";
import { StyleProvider, Root } from "native-base";
import getTheme from "./src/native-base-theme/components";
import material from "./src/native-base-theme/variables/material";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import store from "./src/store";
import PatientListScreen from "./src/screens/PatientList";
import PrescriptionListScreen from "./src/screens/PrescriptionListScreen";
import InterventionScreen from "./src/screens/InterventionScreen";
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import SignInScreen from "./src/screens/SignInScreen";
import NavigationService from "./src/services/NavigationService";

const AppStack = createStackNavigator(
  {
    PatientListScreen: {
      screen: PatientListScreen,
      navigationOptions: {
        header: null
      }
    },
    PrescriptionListScreen: PrescriptionListScreen,
    InterventionScreen: InterventionScreen
  },
  {
    initialRouteName: "PatientListScreen"
  }
);

const AuthStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      header: null
    }
  }
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("./assets/logo_stacked.png"),
      require("./assets/logo_transparent.png")
    ]);

    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Provider store={store}>
          <StyleProvider style={getTheme(material)}>
            <Root>
              <AppContainer
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
            </Root>
          </StyleProvider>
        </Provider>
      </>
    );
  }
}
