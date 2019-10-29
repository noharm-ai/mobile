import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  AsyncStorage,
  Image
} from "react-native";
import {
  Text,
  Content,
  Container,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Icon,
  Button,
  View
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import PatientAvatar from "./PatientAvatar";
import theme from "../native-base-theme/variables/material";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null
    };
  }

  async componentDidMount(props) {
    let authData = await AsyncStorage.getItem("authData");
    let data = JSON.parse(authData);
    this.setState({
      userName: data.name
    });
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[theme.brandGradientStart, theme.brandGradientEnd]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }}
        />
        <Content padder>
          <Image
            source={require("../../assets/logo_stacked_white.png")}
            style={{
              height: 150,
              width: null,
              resizeMode: "contain",
              marginVertical: 15
            }}
          />

          <List>
            <ListItem avatar>
              <Left>
                <PatientAvatar user aggregated />
              </Left>
              <Body>
                <Text style={{ color: theme.brandPrimary, fontWeight: "bold" }}>
                  {this.state.userName}
                </Text>
                <Text note style={{ color: "#ffffff" }}>
                  teste@teste.com.br
                </Text>
              </Body>
              <Right></Right>
            </ListItem>
          </List>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
              marginTop: 30
            }}
          >
            <Button iconLeft rounded onPress={this._signOutAsync}>
              <Icon type="FontAwesome" name="sign-out" style={styles.icon} />
              <Text>Sair</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  },
  icon: {
    color: "#FFFFFF"
  }
});
