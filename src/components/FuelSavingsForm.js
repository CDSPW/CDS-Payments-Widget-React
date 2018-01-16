import React from 'react';
import { func } from 'prop-types';
import FuelSavingsTextInput from './FuelSavingsTextInput';
import { fuelSavings } from '../types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardTitle} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';


const FuelSavingsForm = ({ fuelSavings, onChange }) =>
  (
    <div>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Card
          style={{ width: 650 }}
        >
          <CardTitle title="Choose your preferred payment option:" />
          <List>
            <ListItem
              leftAvatar={<Avatar style={{ marginTop: '10px' }} size={35}> 1 </Avatar>}
            >
              <CardTitle
                subtitle="Your wallet:"
                style={{
                  display: 'inline-block',
                  verticalAlign: 'top'
                }}
              />
              <DropDownMenu
                value={1}
                onChange={() => undefined}
              >
                <MenuItem value={1} primaryText="MasterCard" />
                <MenuItem value={2} primaryText="Visa" />
                <MenuItem value={3} primaryText="Discover" />
                <MenuItem value={4} primaryText="AmericanExpress" />
              </DropDownMenu>
            </ListItem>
            <Divider />
            <ListItem
              leftAvatar={<Avatar style={{ marginTop: '10px' }} size={35}> 2 </Avatar>}
              disabled
            >
              <RaisedButton
                label="Apple Pay"
                icon={<FontIcon className="muidocs-icon-custom-payment" />}
                style={{ margin: 5 }}
              />
              <RaisedButton
                label="PayPal"
                icon={<FontIcon className="muidocs-icon-custom-payment" />}
                style={{ margin: 5 }}
              />
              <RaisedButton
                label="Amazon Pay"
                icon={<FontIcon className="muidocs-icon-custom-payment" />}
                style={{ margin: 5 }}
              />
              <CardTitle
                subtitle="(You will be prompted to sign in to complete the payment process)"
                style={{
                  display: 'inline-block',
                  verticalAlign: 'top'
                }}
              />
            </ListItem>
            <Divider />
            <ListItem
              leftAvatar={<Avatar style={{ marginTop: '10px' }} size={35}> 3 </Avatar>}
              disabled
            >
              <RaisedButton
                label="Visa"
                icon={<FontIcon className="muidocs-icon-custom-payment" />}
                style={{ margin: 5 }}
              />
              <RaisedButton
                label="MasterCard"
                icon={<FontIcon className="muidocs-icon-custom-payment" />}
                style={{ margin: 5 }}
              />
              <RaisedButton
                label="Discover"
                icon={<FontIcon className="muidocs-icon-custom-payment" />}
                style={{ margin: 5 }}
              />
              <RaisedButton
                label="American Express"
                icon={<FontIcon className="muidocs-icon-custom-payment" />}
                style={{ margin: 5 }}
              />
              <div
                style={{
                  height: 100,
                  position: 'relative',
                  float: 'left'
                }}
              >
                <TextField
                  style={{
                    margin: 5,
                    width: 150,
                  }}
                  inputStyle={{
                    height: 80,
                  }}
                  floatingLabelText="Card Number"
                  onChange={onChange}
                  name="ccNumber"
                  value={fuelSavings.ccNumber}
                  id="cc-number"
                  type="text"
                  className="cc-number"
                  data-cds="ccNumber"
                  errorText={fuelSavings.ccNumber ? "" : "This field is required."}
                />
              </div>
              <div
                style={{
                  height: 100,
                  position: 'relative',
                  float: 'left'
                }}
              >
                <DatePicker
                  style={{
                    margin: 5,
                    display: 'inline-block'
                  }}
                  floatingLabelText="Expiration Date"
                />
              </div>
              <div
                style={{
                  height: 100,
                  position: 'relative',
                  float: 'left'
                }}
              >
                <TextField
                  style={{
                    margin: 5,
                    width: 25,
                    display: 'inline-block'
                  }}
                  floatingLabelText="CVV"
                />
              </div>
              <Checkbox
                label="Save this card to My Wallet"
              />
            </ListItem>
            <Divider />
            <ListItem
              leftAvatar={<Avatar style={{ marginTop: '10px' }} size={35}> 4 </Avatar>}
              disabled
            >
              <Checkbox
                label="Bill me later"
              />
            </ListItem>
          </List>
        </Card>
      </MuiThemeProvider>
      <br />
      <br />
      <br />
      <hr />
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="ccNumber">CC Number</label></td>
            <td>
              <FuelSavingsTextInput
                value={fuelSavings.ccNumber}
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
