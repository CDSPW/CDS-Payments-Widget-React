import React from 'react';
import { func } from 'prop-types';
import { fuelSavings } from '../types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardTitle } from 'material-ui/Card';
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
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        <br /> <br /> <br />
        <Card
          style={{ width: 650 }}
        >
          <CardTitle title="Configuration" />
          <List>
            <ListItem
            >
              <Checkbox
                label="Your Wallet"
                name="yourWallet"
                checked={fuelSavings.yourWallet}
                onClick={() => onChange({ target: { name: 'yourWallet', value: !fuelSavings.yourWallet } })}
              />
            </ListItem>
            <ListItem>
              <Checkbox
                label="Pay with"
                name="payWith"
                checked={fuelSavings.payWith}
                onClick={() => onChange({ target: { name: 'payWith', value: !fuelSavings.payWith } })}
              />
            </ListItem>
            <ListItem>
              <Checkbox
                label="Credit"
                name="credit"
                checked={fuelSavings.credit}
                onClick={() => onChange({ target: { name: 'credit', value: !fuelSavings.credit } })}
              />
            </ListItem>
            <ListItem>
              <Checkbox
                label="Bill me later"
                name="billMe"
                checked={fuelSavings.billMe}
                onClick={() => onChange({ target: { name: 'billMe', value: !fuelSavings.billMe } })}
              />
            </ListItem>
          </List>
        </Card>
        <br /> <br /> <br />
        <Card
          style={{ width: 650 }}
        >
          <CardTitle title="Choose your preferred payment option:" />
          <List>
            {
              [
                fuelSavings.yourWallet &&
                <div>
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
                  <Divider />
                </div>,
                fuelSavings.payWith && <div>
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
                  <Divider />
                </div>,
                fuelSavings.credit && <div>
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
                </div>,
                fuelSavings.billMe && <div>
                  <Divider />
                  <br /> <br />
                  <Checkbox
                    label="Bill me later"
                  />
                </div>
              ]
                .filter(f => f)
                .map((e, index) =>
                  ( <ListItem
                      leftAvatar={<Avatar style={{ marginTop: '10px' }} size={35}> {index + 1} </Avatar>}
                      disabled
                      key={index}
                    >
                      {e}
                    </ListItem>)
                )
            }
          </List>
        </Card>

        <br /> <br /> <br />
        <Card
          style={{ width: 650 }}
        >
          <CardTitle title="React Lifecycle (delay of 1.25 sec)" />
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="ccNumber">CC Number</label></td>
                <td>
                  <div
                    style={{
                      width: 300,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                  >
                    {fuelSavings.ccNumber}
                  </div>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="messageControlled">Message</label></td>
                <td>
                  <div
                    style={{
                      width: 300,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                    name="message"
                    id="messageControlled"
                    type="input"
                    data-cds="messageControlled"
                  >
                    {fuelSavings.message}
                  </div>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="messageControlled">cipher</label></td>
                <td>
                  <div
                    style={{
                      width: 300,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                  >
                    {fuelSavings.cipher}
                  </div>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="messageControlled">cardType</label></td>
                <td>
                  <div
                    style={{
                      width: 300,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                    name="cardType"
                    id="cardTypeControlled"
                    type="input"
                    data-cds="cardTypeControlled"
                  >
                    {fuelSavings.cardType}
                  </div>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="responseCodeControlled">Response Code</label></td>
                <td>
                  <div
                    style={{
                      width: 300,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                    name="responseCode"
                    id="responseCodeControlled"
                    type="input"
                    data-cds="responseCodeControlled"
                  >
                    {fuelSavings.responseCode}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <CardTitle title="CDS Encryption " />
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

        </Card>
        <br /> <br /> <br />
      </div>
    </MuiThemeProvider>
  );

FuelSavingsForm.propTypes = {
  onSaveClick: func.isRequired,
  onChange: func.isRequired,
  fuelSavings: fuelSavings.isRequired
};

export default FuelSavingsForm;
