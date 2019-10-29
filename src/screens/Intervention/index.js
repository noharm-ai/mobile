import React, { Component } from "react";
import { View, Content, Spinner } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestInterventionReasons } from "app/src/store/ducks/intervention";
import DefinitionItem from "app/src/components/DefinitionItem";
import PatientHeader from "app/src/components/PatientHeader";
import InterventionForm from "./form";

class InterventionScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Intervenção"
    };
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.patient = navigation.getParam("patient", null);
    this.prescription = navigation.getParam("prescription", null);
  }

  componentDidMount() {
    if (this.props.interventionReasons.length === 0) {
      this.props.requestInterventionReasons();
    }
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    let p = this.patient;
    let d = this.prescription;

    return (
      <Content padder>
        <PatientHeader patient={p} />

        <View style={{ marginTop: 15 }}>
          <DefinitionItem label="Medicamento" value={d.drug} />
          <DefinitionItem label="Dose" value={d.dose + d.measureUnit} />
          <DefinitionItem label="Frequência" value={d.frequency} />
          <DefinitionItem label="Via" value={d.administration} />
          <DefinitionItem label="Escore" value={d.score} />
        </View>

        <InterventionForm
          interventionReasons={this.props.interventionReasons}
          idPrescriptionDrug={this.prescription.idPrescriptionDrug}
        />
      </Content>
    );
  }
}

const mapStateToProps = ({ intervention }) => ({
  loading: intervention.loading,
  interventionReasons: intervention.interventionReasons
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestInterventionReasons }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterventionScreen);
