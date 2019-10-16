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
  H1,
  List,
  ListItem,
  Left,
  Body,
  Icon
} from "native-base";
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
        <Content padder style={{ backgroundColor: "#fff" }}>
          <Image
            source={require("../../assets/logo_stacked.png")}
            style={{
              height: 100,
              width: null,
              resizeMode: "contain",
              marginVertical: 15
            }}
          />

          <List style={{ marginTop: 20 }}>
            <ListItem icon>
              <Left>
                <Icon
                  active
                  type="FontAwesome"
                  name="user"
                  style={styles.icon}
                />
              </Left>
              <Body>
                <Text>{this.state.userName}</Text>
              </Body>
            </ListItem>

            <ListItem icon onPress={this._signOutAsync}>
              <Left>
                <Icon type="FontAwesome" name="sign-out" style={styles.icon} />
              </Left>
              <Body>
                <Text>Sair</Text>
              </Body>
            </ListItem>
          </List>
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
    color: theme.inputColorPlaceholder
  },
  logo: {
    color: "#454545",
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,.1)"
  }
});
