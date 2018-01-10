import React from 'react';
import { func } from 'prop-types';
import FuelSavingsTextInput from './FuelSavingsTextInput';
import { fuelSavings } from '../types';

const FuelSavingsForm = ({ fuelSavings, onChange }) =>
  (
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
            <td><label htmlFor="messageControlled">Message</label></td>
            <td>
              <FuelSavingsTextInput
                name="message"
                value={fuelSavings.message}
                style={{ border: 'none' }}
                id="messageControlled"
                type="input"
                data-cds="messageControlled"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="messageControlled">cipher</label></td>
            <td>
              <FuelSavingsTextInput
                name="cipher"
                value={fuelSavings.cipher}
                style={{ border: 'none' }}
                id="cipherControlled"
                type="input"
                data-cds="cipherControlled"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="messageControlled">cardType</label></td>
            <td>
              <FuelSavingsTextInput
                name="cardType"
                value={fuelSavings.cardType}
                style={{ border: 'none' }}
                id="cardTypeControlled"
                type="input"
                data-cds="cardTypeControlled"
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="responseCodeControlled">Response Code</label></td>
            <td>
              <FuelSavingsTextInput
                name="responseCode"
                value={fuelSavings.responseCode}
                style={{ border: 'none' }}
                id="responseCodeControlled"
                type="input"
                data-cds="responseCodeControlled"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <table>
        <tbody>
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
                name="responseCode"
                style={{ border: 'none' }}
                id="responseCode"
                type="input"
                data-cds="responseCode"
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
