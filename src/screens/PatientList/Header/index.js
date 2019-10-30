import React from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Text, Card, CardItem, Icon, Input, View } from "native-base";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import theme from "../../../native-base-theme/variables/material";

export default ({
  headerOpacity,
  logoOpacity,
  searchOpacity,
  openDrawer,
  updateSearchText,
  search,
  reorder,
  searchText
}) => {
  return (
    <Animated.View
      style={{
        opacity: headerOpacity
      }}
    >
      <Card style={styles.cardHeader}>
        <CardItem style={{ paddingRight: 0 }}>
          <View style={{ width: 40 }}>
            <TouchableOpacity onPress={openDrawer}>
              <Icon type="FontAwesome" name="bars" style={styles.iconHeader} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Animated.View
              style={{ flex: 1, flexDirection: "row", opacity: searchOpacity }}
            >
              <Input
                placeholder="Procurar paciente"
                style={{ height: 25 }}
                onChangeText={text => updateSearchText(text)}
                onEndEditing={() => search()}
                value={searchText}
              />

              {searchText != null && searchText !== "" && (
                <TouchableOpacity
                  onPress={() => {
                    updateSearchText("");
                    search("");
                  }}
                >
                  <Icon
                    type="FontAwesome"
                    name="times"
                    style={{ ...styles.iconHeader, marginRight: 10 }}
                  />
                </TouchableOpacity>
              )}
            </Animated.View>

            <Animated.View
              style={{
                opacity: logoOpacity,
                position: "absolute",
                left: "50%",
                marginLeft: -65,
                top: -5,
                zIndex: -1
              }}
            >
              <Text style={{ fontSize: 25 }}>
                noharm
                <Text style={{ color: theme.brandPrimary, fontSize: 15 }}>
                  .ai
                </Text>
              </Text>
            </Animated.View>
          </View>
          <View style={{ width: 35 }}>
            <Menu
              onSelect={({ field, direction }) => reorder(field, direction)}
            >
              <MenuTrigger>
                <View
                  style={{
                    width: 35,
                    alignItems: "center",
                    paddingRight: 5
                  }}
                >
                  <Icon
                    type="FontAwesome"
                    name="ellipsis-v"
                    style={styles.iconHeader}
                  />
                </View>
              </MenuTrigger>

              <MenuOptions>
                <MenuOption value={{ field: "score", direction: "desc" }}>
                  <Text style={styles.menuContent}>Ordenar por escore</Text>
                </MenuOption>
                <MenuOption value={{ field: "date", direction: "desc" }}>
                  <Text style={styles.menuContent}>
                    Ordenar por data de prescrição
                  </Text>
                </MenuOption>
                <MenuOption value={{ field: "name", direction: "asc" }}>
                  <Text style={styles.menuContent}>Ordenar por paciente</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </CardItem>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10
  },
  iconHeader: {
    fontSize: 25,
    color: theme.inputColorPlaceholder
  },
  menuContent: {
    padding: 5
  }
});
