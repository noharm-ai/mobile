import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Text,
  Content,
  Container,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Spinner,
  Icon,
  Fab,
  Toast,
  View
} from "native-base";
import Moment from "moment";
import { Chip } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestPrescription } from "../store/ducks/prescription";
import PatientAvatar from "../components/PatientAvatar";
import PatientHeader from "../components/PatientHeader";

class PrescriptionListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Triagem"
    };
  };

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam("id", null);

    this.props.requestPrescription(id);
  }

  chip(text) {
    return <Chip style={styles.chip}>{text}</Chip>;
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    const age = Moment().diff(this.props.patient.birthdate, "years");

    return (
      <Container>
        <Content padder>
          <PatientHeader patient={this.props.patient} />
          <View style={styles.chipContainer}>
            {this.chip(`${age} anos`)}
            {this.chip(
              this.props.patient.gender === "F" ? "Feminino" : "Masculino"
            )}
            {this.chip(`${this.props.patient.weight}kg`)}
            {this.chip(this.props.patient.race === "B" ? "Branco" : "Negro")}
            {this.chip(`Risco: ${this.props.patient.risk}`)}
            {this.chip("Creatinina: 1,08")}
            {this.chip("MDRD: 72")}
            {this.chip("TGO: 41")}
            {this.chip("TGP: 24")}
          </View>

          <Text style={{ marginTop: 10 }}>Medicamentos</Text>
          <List>
            {this.props.patient.prescription.map(p => (
              <ListItem
                avatar
                key={p.idPrescriptionDrug}
                onPress={() =>
                  this.props.navigation.navigate("InterventionScreen", {
                    patient: this.props.patient,
                    prescription: p
                  })
                }
              >
                <Left>
                  <PatientAvatar score={p.score} />
                </Left>
                <Body>
                  <Text>{p.drug}</Text>
                  <Text note>
                    {p.dose}
                    {p.measureUnit} - {p.frequency} - {p.administration}
                  </Text>
                </Body>
                <Right>
                  <Text note>Escore {p.score}</Text>
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
        <Fab
          position="bottomRight"
          style={{ backgroundColor: "green" }}
          onPress={() => {
            Toast.show({
              text: "Prescrição triada com sucesso",
              type: "success",
              duration: 3000,
              buttonText: "Ok"
            });
          }}
        >
          <Icon type="FontAwesome" name="check" />
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 20
  },
  chip: {
    marginHorizontal: 2,
    marginVertical: 2
  }
});

const mapStateToProps = ({ prescription }) => ({
  loading: prescription.loading,
  patient: prescription.patient
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestPrescription }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrescriptionListScreen);
