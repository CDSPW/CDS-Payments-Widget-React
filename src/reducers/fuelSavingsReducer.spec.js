import * as ActionTypes from '../constants/actionTypes';
import reducer from './fuelSavingsReducer';
import { getFormattedDateTime } from '../utils/dates';

describe('Reducers::FuelSavings', () => {
  const getInitialState = () => {
    return {
      "CVVValidationMessage": "",
      "billMe": true,
      "ccNumber": "",
      "credit": true,
      "cvvToggle": true,
      "demo": true,
      "payWith": false,
      "responseCode": "",
      "yourWallet": false
    };
  };

  const getAppState = () => {
    return {
      billMe: false,
      ccNumber: '',
      credit: true,
      demo: false,
      payWith: false,
      responseCode: '',
      yourWallet: false,
      CVVValidationMessage: ''
    };
  };
  const dateModified = getFormattedDateTime();

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle SAVE_FUEL_SAVINGS', () => {
    const action = { type: ActionTypes.SAVE_FUEL_SAVINGS, dateModified, settings: getAppState() };
    const expected = Object.assign(getAppState(), { dateModified });

    expect(reducer(getAppState(), action)).toEqual(expected);
  });

  it.skip('should handle CALCULATE_FUEL_SAVINGS', () => {
    const action = { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: getAppState(), fieldName: 'newMpg', value: 30 };

    const expectedMpg = 30;
    const expectedSavings = { monthly: '$43.33', annual: '$519.96', threeYear: '$1,559.88' };

    expect(reducer(getAppState(), action).newMpg).toEqual(expectedMpg);
    expect(reducer(getAppState(), action).savings).toEqual(expectedSavings);
  });
});
