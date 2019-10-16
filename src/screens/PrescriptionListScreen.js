import React, { Component } from "react";
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
  Toast
} from "native-base";
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

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <Container>
        <Content padder>
          <PatientHeader patient={this.props.patient} />

          <Text style={{ marginTop: 20 }}>Medicamentos</Text>
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
