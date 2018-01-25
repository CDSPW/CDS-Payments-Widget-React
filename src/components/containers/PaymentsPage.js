import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/fuelSavingsActions';
import FuelSavingsForm from '../FuelSavingsForm';

export class PaymentsPage extends React.Component {
  componentDidMount = () => {
    this.getInitalConfig();
    this.getCDSResponse(5000);
  }
  getInitalConfig = () => {
    let datacdsgpayments = document.querySelector('[id = "data-cdsg-payments"]');
    let initialConfig = datacdsgpayments && datacdsgpayments['attributes'];
    let { fuelsavings } = this.props;
    if (initialConfig) {
      initialConfig['billMe'] && this.props.actions.saveFuelSavings(fuelsavings, 'billMe', initialConfig['billMe'].value === '1' ? true : false);
      initialConfig['yourWallet'] && this.props.actions.saveFuelSavings(fuelsavings, 'yourWallet', initialConfig['yourWallet'].value === '1' ? true : false);
      initialConfig['payWith'] && this.props.actions.saveFuelSavings(fuelsavings, 'payWith', initialConfig['payWith'].value === '1' ? true : false);
      initialConfig['credit'] && this.props.actions.saveFuelSavings(fuelsavings, 'credit', initialConfig['credit'].value === '1' ? true : false);
      initialConfig['cvv'] && this.props.actions.saveFuelSavings(fuelsavings, 'cvvToggle', initialConfig['cvv'].value === '1' ? true : false);
      initialConfig['demo'] && this.props.actions.saveFuelSavings(fuelsavings, 'demo', initialConfig['demo'].value === '1' ? true : false);
    }
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
  getValue = attr => document.querySelector(attr) && document.querySelector(attr).value;
  getCDSResponse = (t) => {
    let responseCodeInput, responseCode;
    setTimeout(() => {
      responseCodeInput = document.querySelector('[data-cds = "responseCode"]');
      responseCode = responseCodeInput && responseCodeInput.value;
      if (this.props.fuelSavings.responseCode != responseCode) {
        this.handleValidationDisplay(responseCode);
        this.props.actions.saveFuelSavings(this.props.fuelSavings, 'responseCode', responseCode);
        this.props.actions.saveFuelSavings(this.props.fuelSavings, 'cipher', this.getValue('[data-cds = "cipher"]'));
        this.props.actions.saveFuelSavings(this.props.fuelSavings, 'cardType', this.getValue('[data-cds = "cardType"]'));
        this.props.actions.saveFuelSavings(this.props.fuelSavings, 'ccNumber', this.getValue('[data-cds = "ccNumber"]'));
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
    this.getCDSResponse(3000);

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
