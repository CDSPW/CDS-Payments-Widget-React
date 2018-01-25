import React from 'react';
import { func } from 'prop-types';
import { fuelSavings } from '../types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardText,
  CardTitle,
} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Valid from 'card-validator';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';


const FuelSavingsForm = (
  {
  fuelSavings: {
    billMe,
    ccNumber,
    credit,
    cvv,
    cvvToggle,
    expDate,
    message,
    payWith,
    yourWallet,
  },
    onChange
}) => {
  //const { billMe, ccNumber, credit, cvv, expDate, payWith, yourWallet, } = fuelSavings;
  const { card, isValid, isPotentiallyValid } = Valid.number(ccNumber);
  const { niceType, lengths: cardLength } = card ? card : '';
  const cvvLength = card ? card.code.size : '';
  const { isValid: validCvv } = Valid.cvv(cvv, cvvLength);
  const { isValid: validExpDate } = Valid.expirationDate(expDate);

  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        <Card
          style={{ width: 650 }}
        >
          {false && <CardTitle title="Choose your preferred payment option:" />}
          <List>
            {
              [
                yourWallet &&
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
                payWith && <div>
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
                credit && <div>
                  <RaisedButton
                    label="Visa"
                    icon={<FontIcon className="muidocs-icon-custom-payment" />}
                    style={{ margin: 5 }}
                    disabled={niceType !== 'Visa'}
                  />
                  <RaisedButton
                    label="MasterCard"
                    icon={<FontIcon className="muidocs-icon-custom-payment" />}
                    style={{ margin: 5 }}
                    disabled={niceType !== 'MasterCard'}
                  />
                  <RaisedButton
                    label="Discover"
                    icon={<FontIcon className="muidocs-icon-custom-payment" />}
                    style={{ margin: 5 }}
                    disabled={niceType !== 'Discover'}
                  />
                  <RaisedButton
                    label="American Express"
                    icon={<FontIcon className="muidocs-icon-custom-payment" />}
                    style={{ margin: 5 }}
                    disabled={niceType !== 'AmericanExpress'}
                  />
                  <div
                    style={{
                      //height: 100,
                      //position: 'relative',
                      //float: 'left'
                    }}
                  >
                    <TextField
                      style={{
                        //margin: 5,
                        width: '75%',
                      }}
                      inputStyle={{
                        // height: 80,
                      }}
                      floatingLabelText="Card Number"
                      onChange={(e, value) => onChange({ target: { name: 'ccNumber', value } })}
                      value={ccNumber}
                      name="ccNumber"
                      id="cc-number"
                      className="cc-number"
                      data-cds="ccNumber"
                      errorText={
                        (() => {
                          if (ccNumber !== "" && !isValid)
                            return "This field is required. " + niceType + " cards must be " + cardLength + " long.";
                        })()
                      }
                    />
                  </div>
                  <div
                    style={{
                      //height: 100,
                      //position: 'relative',
                      //float: 'left'
                    }}
                  >
                    <TextField
                      onChange={(e, expDateValue) => onChange({ target: { name: 'expDate', value: expDateValue } })}
                      name="expDate"
                      value={expDate}
                      style={{
                        //margin: 5,
                        // display: 'inline-block'
                      }}
                      floatingLabelText="Expiration Date"
                      hintText="MM/YY"
                      errorText={
                        (() => {
                          if (ccNumber !== "" && !validExpDate)
                            return "This field is required. ";
                        })()
                      }
                    />
                  </div>
                  {cvvToggle && <TextField
                    style={{
                      //margin: 5,
                      //width: 25,
                      //display: 'inline-block'
                    }}
                    floatingLabelText="CVV"
                    name="cvv"
                    onChange={onChange}
                    value={cvv}
                    errorText={
                      (() => {
                        if (ccNumber !== "" && !validCvv) return niceType ? "not valid..." + niceType + " requires " + cvvLength + " digits." : "not valid...";
                      })()
                    }
                  />}
                  <br /><br />
                  {yourWallet && <Checkbox
                    label="Save this card to My Wallet"
                  />}
                </div>,
                billMe && <div>
                  <Divider />
                  <br /> <br />
                  <Checkbox
                    label="Bill me later"
                  />
                </div>
              ]
                .filter(f => f)
                .filter((option, index, options) =>  {
                  if (options.length === 1 && billMe) return false;
                  return option;
                })
                .map((e, index, options) =>
                  (<ListItem
                    leftAvatar={(options.length > 1) && <Avatar style={{ marginTop: '10px' }} size={35}>
                      {options.length > 1 ? index + 1 : ''}
                    </Avatar>}
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
        <Drawer
          open
        >
          <Card
          >
            <CardTitle title="Configuration" />
            <List>
              <ListItem
                onClick={() => onChange({ target: { name: 'yourWallet', value: !yourWallet } })}
              >
                <Checkbox
                  label="Your Wallet"
                  name="yourWallet"
                  checked={yourWallet}
                  onClick={() => onChange({ target: { name: 'yourWallet', value: !yourWallet } })}
                />
              </ListItem>
              <ListItem
                onClick={() => onChange({ target: { name: 'payWith', value: !payWith } })}
              >
                <Checkbox
                  label="Pay with"
                  name="payWith"
                  checked={payWith}
                  onClick={() => onChange({ target: { name: 'payWith', value: !payWith } })}
                />
              </ListItem>
              <ListItem
                onClick={() => onChange({ target: { name: 'credit', value: !credit } })}
              >
                <Checkbox
                  label="Credit"
                  name="credit"
                  checked={credit}
                />
              </ListItem>
              <ListItem
                onClick={() => onChange({ target: { name: 'cvvToggle', value: !cvvToggle } })}
              >
                <Checkbox
                  label="CVV"
                  checked={cvvToggle}
                  style={{ paddingLeft: 20 }}
                />
              </ListItem>
              <ListItem onClick={() => onChange({ target: { name: 'billMe', value: !billMe } })} >
                <Checkbox
                  label="Bill me later"
                  checked={billMe}
                />
              </ListItem>
            </List>
          </Card>
          <br /> <br /> <br />
          <Card
          >
            <CardTitle title="Demo" />
            <List>
              <ListItem

                onClick={() => {
                  onChange({ target: { name: 'ccNumber', value: (ccNumber === '4012888888881881') ? '' : '4012888888881881' } });
                }}
              >
                <Checkbox
                  label="Visa: 4012888888881881"
                  checked={(ccNumber === '4012888888881881')}
                />
              </ListItem>
              <ListItem
                onClick={() => {
                  onChange({ target: { name: 'ccNumber', value: (ccNumber === '6011') ? '' : '6011' } });
                }}
              >
                <Checkbox
                  label="Visa: 6011"
                  checked={(ccNumber === '6011')}
                />
              </ListItem>
            </List>
          </Card>
          <br /> <br /> <br />
          <Card
            style={{ width: 650 }}
          >
            <CardTitle title="Card-Validator" subtitle="4012888888881881" />
            <table>
              <tbody>
                <tr>
                  <td><label >card.type: </label></td>
                  <td>
                    <div style={{ width: 300, textOverflow: 'ellipsis', overflow: 'hidden' }} >
                      {niceType}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><label >isPotentiallyValid: </label></td>
                  <td>
                    <div style={{ width: 300, textOverflow: 'ellipsis', overflow: 'hidden' }} >

                      {isPotentiallyValid.toString()}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><label >isValid: </label></td>
                  <td>
                    <div style={{ width: 300, textOverflow: 'ellipsis', overflow: 'hidden' }} >

                      {isValid.toString()}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><label >validCvv: </label></td>
                  <td>
                    <div style={{ width: 300, textOverflow: 'ellipsis', overflow: 'hidden' }} >
                      {validCvv.toString()}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
            <CardTitle title="React Lifecycle (delay of 3 sec)" />
            <table>
              <tbody>
                <tr>
                  <td><label htmlFor="ccNumber">CC Number</label></td>
                  <td>
                    <div
                      style={{ width: 300, textOverflow: 'ellipsis', overflow: 'hidden' }}
                    >
                      {ccNumber}
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
                      {message}
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
                  <td><label htmlFor="ccNumber">ccNumber</label></td>
                  <td>
                    <input
                      style={{ border: 'none' }}
                      placeholder="ccNumber"
                      value={ccNumber}
                      readOnly
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
        </Drawer>
      </div>
    </MuiThemeProvider>
  );
};
FuelSavingsForm.propTypes = {
  onSaveClick: func.isRequired,
  onChange: func.isRequired,
  fuelSavings: fuelSavings.isRequired
};

export default FuelSavingsForm;
