import React, { Component } from "react";
import { StyleSheet, Alert, ScrollView } from "react-native";
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
import { requestPrescription } from "app/src/store/ducks/prescription";
import PatientAvatar from "app/src/components/PatientAvatar";
import PatientHeader from "app/src/components/PatientHeader";
import ExamResult from "app/src/components/ExamResult";

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
          </View>

          <Text style={{ marginTop: 10 }}>Exames</Text>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ExamResult
              exam="Creatinina"
              value="1,08"
              fill={90}
              color="#e57373"
            />
            <ExamResult exam="MDRD" value="72" fill={50} color="#00e0ff" />
            <ExamResult exam="TGO" value="41" fill={65} color="#00e0ff" />
            <ExamResult exam="TGP" value="24" fill={100} color="#00e0ff" />
          </ScrollView>

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
            Alert.alert(
              "Confirmar triagem",
              "Confirma a triagem desta prescrição?",
              [
                {
                  text: "Cancelar",
                  style: "cancel"
                },
                {
                  text: "OK",
                  onPress: () =>
                    Toast.show({
                      text: "Prescrição triada com sucesso",
                      type: "success",
                      duration: 3000,
                      buttonText: "Ok"
                    })
                }
              ],
              { cancelable: false }
            );
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
  },
  examCard: {
    width: 100
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
