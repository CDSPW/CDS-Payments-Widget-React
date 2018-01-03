import React from 'react';
import { func } from 'prop-types';
import FuelSavingsTextInput from './FuelSavingsTextInput';
import { fuelSavings } from '../types';

const FuelSavingsForm = ({ fuelSavings, onChange }) => (
  <div>
    <hr />
    <h2>Payments Widget</h2>
    <table>
      <tbody>
        <tr>
          <td><label htmlFor="ccNumber">CC Number</label></td>
          <td>
            <FuelSavingsTextInput
              onChange={onChange}
              name="ccNumber"
              value={fuelSavings.ccNumber}
              id="cc-number"
              type="text"
              className="cc-number"
              data-cds="ccNumber"
              required
            />
          </td>
        </tr>
        <tr>
          <td><label htmlFor="cipher">Cipher</label></td>
          <td>
            <input
              style={{ border: 'none' }}
              id="cipher"
              type="input"
              placeholder="Cipher"
              data-cds="cipher"
              readOnly
              disabled
            />
          </td>
        </tr>
        <tr>
          <td><label htmlFor="cardType">Card Type</label></td>
          <td>
            <input
              style={{ border: 'none' }}
              id="cardType"
              type="input"
              placeholder="Card Type"
              data-cds="cardType"
              readOnly
              disabled
            />
          </td>
        </tr>
        <tr>
          <td><label htmlFor="responseCode">Response Code</label></td>
          <td>
            <input
              style={{ border: 'none' }}
              id="responseCode"
              type="input"
              data-cds="responseCode"
              readOnly
              disabled
            />
          </td>
        </tr>
      </tbody>
    </table>

    <hr />

  </div>
);

FuelSavingsForm.propTypes = {
  onSaveClick: func.isRequired,
  onChange: func.isRequired,
  fuelSavings: fuelSavings.isRequired
};

export default FuelSavingsForm;
