import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Animated,
  RefreshControl
} from "react-native";
import {
  Container,
  ListItem,
  Left,
  Right,
  Body,
  Text,
  Card,
  CardItem,
  Icon,
  Input,
  Drawer,
  View,
  Spinner,
  Fab,
  ActionSheet,
  H3
} from "native-base";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import PatientAvatar from "../components/PatientAvatar";
import Sidebar from "../components/Sidebar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  updateSearchText,
  updateSearchOrder,
  updateSearchSegment,
  requestPatients,
  requestSegments
} from "../store/ducks/patient";
import theme from "../native-base-theme/variables/material";

class PatientListScreen extends Component {
  constructor(props) {
    super(props);

    this.defaultSegment = "Todos segmentos";
    this.logoOpacity = new Animated.Value(1);
    this.searchOpacity = new Animated.Value(0);
    this.scrollY = new Animated.Value(0);

    Animated.stagger(2000, [
      Animated.timing(this.logoOpacity, {
        toValue: 0,
        duration: 3000
      }),
      Animated.timing(this.searchOpacity, {
        toValue: 1,
        duration: 2000
      })
    ]).start();

    this.headerOpacity = this.scrollY.interpolate({
      inputRange: [0, 45],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    this.state = {
      refreshing: false
    };
  }

  componentDidMount() {
    this.search();
    if (this.props.segments.length === 0) {
      this.props.requestSegments();
    }
  }

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  search = () => {
    this.props.requestPatients(this.props.searchParams);
  };

  reorder = (field, direction) => {
    this.props.updateSearchOrder(field, direction);
    this.props.requestPatients({
      ...this.props.searchParams,
      order: field,
      direction: direction
    });
  };

  segmentChange = buttonIndex => {
    if (buttonIndex === undefined) return;

    let id = null;
    let description = this.defaultSegment;

    if (buttonIndex !== 0) {
      const segment = this.props.segments[buttonIndex - 1];
      id = segment.id;
      description = segment.description;
    }

    this.props.updateSearchSegment(id, description);
    this.props.requestPatients({
      ...this.props.searchParams,
      idSegment: id
    });
  };

  patientList() {
    if (this.props.patients.length === 0) {
      return (
        <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
          <Text>Nenhum registro encontrado.</Text>
        </View>
      );
    }

    return (
      <>
        {this.props.patients.map(patient => (
          <ListItem
            avatar
            key={patient.idPrescription}
            onPress={() =>
              this.props.navigation.navigate("PrescriptionListScreen", {
                id: patient.idPrescription
              })
            }
          >
            <Left>
              <PatientAvatar score={patient.prescriptionScore} aggregated />
            </Left>
            <Body>
              <Text>{patient.name}</Text>
              <Text note>Risco da prescrição: {patient.prescriptionScore}</Text>
            </Body>
            <Right>
              <Text note>
                {patient.daysAgo} dia
                {patient.daysAgo === 0 || patient.daysAgo > 1 ? "s" : ""}
              </Text>
            </Right>
          </ListItem>
        ))}
      </>
    );
  }

  header() {
    return (
      <Animated.View
        style={{
          ...styles.header,
          opacity: this.headerOpacity
        }}
      >
        <Card style={{ marginLeft: 12, marginRight: 12, marginTop: 10 }}>
          <CardItem style={{ paddingRight: 0 }}>
            <View style={{ width: 40 }}>
              <TouchableOpacity onPress={this.openDrawer}>
                <Icon
                  type="FontAwesome"
                  name="bars"
                  style={styles.iconHeader}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <Animated.View style={{ flex: 1, opacity: this.searchOpacity }}>
                <Input
                  placeholder="Procurar paciente"
                  style={{ height: 25 }}
                  onChangeText={text => this.props.updateSearchText(text)}
                  onEndEditing={this.search}
                />
              </Animated.View>

              <Animated.View
                style={{
                  opacity: this.logoOpacity,
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
                onSelect={({ field, direction }) =>
                  this.reorder(field, direction)
                }
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
  }

  render() {
    const segmentOptions = [this.defaultSegment].concat(
      this.props.segments.map(item => item.description)
    );

    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<Sidebar navigation={this.props.navigation} />}
      >
        <MenuProvider>
          <Container style={styles.container}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.search}
                />
              }
              scrollEventThrottle={16}
              onScroll={Animated.event([
                { nativeEvent: { contentOffset: { y: this.scrollY } } }
              ])}
              stickyHeaderIndices={[1]}
            >
              {this.header()}
              <H3 style={styles.contentTitle}>{this.props.activeSegment}</H3>
              {this.props.loading ? <Spinner /> : this.patientList()}
            </ScrollView>
            {!this.props.loadingSegments && (
              <Fab
                position="bottomRight"
                style={{ backgroundColor: theme.brandPrimary }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: segmentOptions,
                      title: "Escolha o segmento"
                    },
                    buttonIndex => this.segmentChange(buttonIndex)
                  )
                }
              >
                <Icon type="FontAwesome" name="filter" />
              </Fab>
            )}
          </Container>
        </MenuProvider>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  },
  iconHeader: {
    fontSize: 25,
    color: theme.inputColorPlaceholder
  },
  menuContent: {
    padding: 5
  },
  contentTitle: {
    marginHorizontal: 13,
    paddingTop: 15,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    backgroundColor: "#FFF"
  }
});

const mapStateToProps = ({ patient }) => ({
  loading: patient.loading,
  patients: patient.patients,
  searchParams: patient.searchParams,
  loadingSegments: patient.loadingSegments,
  segments: patient.segments,
  activeSegment: patient.activeSegment
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateSearchText,
      updateSearchOrder,
      updateSearchSegment,
      requestPatients,
      requestSegments
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientListScreen);
