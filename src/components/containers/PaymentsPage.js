import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/fuelSavingsActions';
import FuelSavingsForm from '../FuelSavingsForm';

export class PaymentsPage extends React.Component {
  componentDidMount = () => {
    this.getInitalConfig();
  }
  getInitalConfig = () => {
    let datacdsgpayments = document.querySelector('[id = "data-cdsg-payments"]');
    let initialConfig = datacdsgpayments && datacdsgpayments['attributes'];
    let { fuelsavings, actions: { saveFuelSavings } } = this.props;
    if (initialConfig) {
      initialConfig['billMe'] && saveFuelSavings(fuelsavings, 'billMe', initialConfig['billMe'].value === '1' ? true : false);
      initialConfig['yourWallet'] && saveFuelSavings(fuelsavings, 'yourWallet', initialConfig['yourWallet'].value === '1' ? true : false);
      initialConfig['payWith'] && saveFuelSavings(fuelsavings, 'payWith', initialConfig['payWith'].value === '1' ? true : false);
      initialConfig['credit'] && saveFuelSavings(fuelsavings, 'credit', initialConfig['credit'].value === '1' ? true : false);
      initialConfig['cvv'] && saveFuelSavings(fuelsavings, 'cvvToggle', initialConfig['cvv'].value === '1' ? true : false);
      initialConfig['demo'] && saveFuelSavings(fuelsavings, 'demo', initialConfig['demo'].value === '1' ? true : false);
      initialConfig['allowedCards'] && saveFuelSavings(fuelsavings, 'allowedCards', initialConfig['allowedCards'].value);
      if (initialConfig['allowedCards']) {
        let allowedCards = initialConfig['allowedCards'].value.split(' ');
        console.log('\n\n\n', { allowedCards })
        if (allowedCards.filter(a => a === 'MC').length) saveFuelSavings(fuelsavings, 'MCToggle', true);
        if (allowedCards.filter(a => a === 'VI').length) saveFuelSavings(fuelsavings, 'VIToggle', true);
        if (allowedCards.filter(a => a === 'DC').length) saveFuelSavings(fuelsavings, 'DCToggle', true);
        if (allowedCards.filter(a => a === 'AX').length) saveFuelSavings(fuelsavings, 'AXToggle', true);
        if (allowedCards.filter(a => a === 'DI').length) saveFuelSavings(fuelsavings, 'DIToggle', true);
        if (allowedCards.filter(a => a === 'JCB').length) saveFuelSavings(fuelsavings, 'JCBToggle', true);
      }
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
    return (
      <FuelSavingsForm
        onSaveClick={this.saveFuelSavings}
        onChange={this.calculateFuelSavings}
        fuelSavings={this.props.fuelSavings}
        routing={this.props.routing}
        getCDSResponse={this.getCDSResponse}
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
    fuelSavings: state.fuelSavings,
    routing: state.routing
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
