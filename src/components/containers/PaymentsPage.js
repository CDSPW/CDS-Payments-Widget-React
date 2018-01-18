import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/fuelSavingsActions';
import FuelSavingsForm from '../FuelSavingsForm';

export class PaymentsPage extends React.Component {
  componentDidMount = () => {
    this.uncontrolledToControlled(5000);
  }
  handleValidationDisplay = responseCode => {
    let logThings = message => this.props.actions.saveFuelSavings(this.props.fuelSavings, 'message', message);
    switch (responseCode) {
      case '100':
        logThings('Successful encryption, client can read the data rendered by plug in client can read the cipherfrom the hidden field card type can be read from the card type hidden field');
        break;
      case '003':
        logThings('Inform the user about invalid card number entered');
        break;
      case '':
        logThings('Inform the user aboutcard number field being empty');
        break;
      case '753':
        logThings('Inform the user about card type is not allowed');
        break;
      case '074':
        logThings('This is optional can be used if you want to have any functionality while the user is entering the credit card number');
        break;
      case '075':
        logThings('Please correct the configuration provided for the plugin');
        break;
      case '099':
        logThings('Please contact CDS to reportthis system error, this can also be due to client not being registered with CDS');
        break;
      default:
        logThings('default case');
    }
  }
  uncontrolledToControlled = (t) => {
    let responseCodeInput, responseCode;
    setTimeout(() => {
      responseCodeInput = document.querySelector('[data-cds = "responseCode"]');
      responseCode = responseCodeInput && responseCodeInput.value;
      //console.warn('\n\n\n PaymentsPage: render');
      //console.warn(' responseCode: ', responseCodeInput);
      //console.warn(' responseCodeValue: ', responseCode);
      //console.warn(' this.props.fuelSavings: ', this.props.fuelSavings.responseCode);
      //console.warn(' responseCode', (this.props.fuelSavings.responseCode != responseCode));
      //console.warn(' notEqual', (this.props.fuelSavings.responseCode != responseCode));
      //console.warn(' notEqual', this.props.fuelSavings.responseCode, responseCode);
      if (this.props.fuelSavings.responseCode != responseCode) {
        this.handleValidationDisplay(responseCode);
        this.props.actions.saveFuelSavings(this.props.fuelSavings, 'responseCode', responseCode);
        this.props.actions.saveFuelSavings(this.props.fuelSavings, 'cipher', document.querySelector('[data-cds = "cipher"]').value);
        this.props.actions.saveFuelSavings(this.props.fuelSavings, 'cardType', document.querySelector('[data-cds = "cardType"]').value);
        this.props.actions.saveFuelSavings(this.props.fuelSavings, 'ccNumber', document.querySelector('[data-cds = "ccNumber"]').value);
      }
    }, t);

  }
  saveFuelSavings = () => {
    this.props.actions.saveFuelSavings(this.props.fuelSavings);
  }

  calculateFuelSavings = e => {
    this.props.actions.calculateFuelSavings(this.props.fuelSavings, e.target.name, e.target.value);
  }

  render() {
    this.uncontrolledToControlled(1250);

    return (
      <FuelSavingsForm
        onSaveClick={this.saveFuelSavings}
        onChange={this.calculateFuelSavings}
        fuelSavings={this.props.fuelSavings}
      />
    );
  }
}

PaymentsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentsPage);
