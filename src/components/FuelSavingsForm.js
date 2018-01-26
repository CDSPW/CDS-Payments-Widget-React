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
  CardTitle,
} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Valid from 'card-validator';
import Drawer from 'material-ui/Drawer';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const FuelSavingsForm = (
  {
  fuelSavings: {
    AXToggle,
    DCToggle,
    DIToggle,
    JCBToggle,
    MCToggle,
    VIToggle,
    billMe,
    cardType,
    ccNumber,
    cipher,
    credit,
    cvv,
    cvvToggle,
    demo,
    expDate,
    message,
    payWith,
    responseCode,
    yourWallet,
    CVVValidationMessage,
  },
    onChange,
    getCDSResponse
}) => {

  //const { billMe, ccNumber, credit, cvv, expDate, payWith, yourWallet, } = fuelSavings;
  const { card, isValid, isPotentiallyValid } = Valid.number(ccNumber);
  const { niceType, lengths: cardLength } = card ? card : '';
  const cvvLength = card ? card.code.size : '';
  const { isValid: validCvv } = Valid.cvv(cvv, cvvLength);
  const { isValid: validExpDate } = Valid.expirationDate(expDate);

  const markup = <pre>
    {`<!DOCTYPE html>
<html lang="en">
<script src="https://s3.amazonaws.com/cds-tzn-test/resources/cds-process.min.js"></script>
<script>
  CDS
  .cdsProcess
  .allowedCards =`}{`[`}{
      [
        MCToggle ? '"MC", ' : null,
        VIToggle ? '"VI", ' : null,
        AXToggle ? '"AX", ' : null,
        DIToggle ? '"AX", ' : null,
        DCToggle ? '"DC", ' : null,
        JCBToggle ? '"JCB", ' : null,
      ]
        .filter(allowed => allowed)
    }{`]
  CDS.cdsProcess.clientCode("abc")
</script>
<div
  id="data-cdsg-payments"
  demo="0"
  billme="`}{[billMe ? 1 : 0].join('')}{`"
  yourWallet="`}{[yourWallet ? 1 : 0].join('')}{`"
  payWith="`}{[payWith ? 1 : 0].join('')}{`"
  credit="`}{[credit ? 1 : 0].join('')}{`"
  cvv="`}{[cvv ? 1 : 0].join('')}{`"
  CVVValidationMessage="`}{[CVVValidationMessage].join('')}{`"
  allowedCards="`}{[
      MCToggle ? 'MC ' : '',
      VIToggle ? 'VI ' : '',
      AXToggle ? 'AX ' : '',
      DIToggle ? 'AX ' : '',
      DCToggle ? 'DC ' : '',
      JCBToggle ? 'JCB ' : ''
    ].filter(allowed => allowed).join('')
    }{`"
  ></div>

<div id="app"></div>
<script type="text/javascript" src="https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/dist/payments-widget.js"></script>

<link href="https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/dist/main.css" rel="stylesheet">
</html> `}
  </pre>;

  const { props: { children: markupChildren } } = markup
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        <Card
          style={{ width: 750 }}
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
                    icon={<img height="100%" src="https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/apple-pay.png" />}
                    style={{ margin: 5 }}
                  />
                  <RaisedButton
                    label="PayPal"
                    icon={<img height="100%" src="https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/amazon-pay.png" />}
                    style={{ margin: 5 }}
                  />
                  <RaisedButton
                    label="Amazon Pay"
                    icon={<img height="100%" src="https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/amazon-pay.png" />}
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





                credit && <div style={{ width: "100%" }}>
                  {
                    [
                      {
                        niceType: "Visa",
                        bool: VIToggle,
                        image: "https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/visa.png",

                      },
                      {
                        niceType: "MasterCard",
                        bool: MCToggle,
                        image: "https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/mastercard.png",
                      },
                      {
                        niceType: "AmericanExpress",
                        bool: AXToggle,
                        image: 'https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/americanexpress.png'
                      },
                      {
                        niceType: "DiscoverCard",
                        bool: DIToggle,
                        image: 'https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/discover.png'
                      },
                      {
                        niceType: "DinnersClub",
                        bool: DCToggle,
                        image: 'https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/dinersclub.png'
                      },
                      {
                        niceType: "JCB",
                        bool: JCBToggle,
                        image: 'https://cdn.rawgit.com/McCallTech/CDS-Payments-Widget/master/src/images/credit_card.png'
                      }
                    ].map((card, key) => (
                      <div key={key}>
                        {
                          card.bool && <div style={{
                            display: 'inline-block',
                            float: 'left',
                            height: '45px',
                            margin: 5,
                            position: 'relative',
                            width: '95px',
                          }}
                          >
                            <RaisedButton
                              //label="Visa"
                              icon={<img height="100%" src={card.image} />}
                              style={{
                                margin: 5,
                              }}
                              disabled={niceType !== card.niceType}
                            />
                            <div style={{
                              background: 'gray',
                              height: '100%',
                              width: '100%',
                              opacity: (niceType !== card.niceType) ? '.75' : 0,
                              top: 0,
                              left: 0,
                              position: 'absolute',
                              padding: 0,
                            }}
                            //http://www.korenlc.com/css-overlay-how-to-create-a-simple-css-overlay/
                            >
                            </div>
                          </div>
                        }
                      </div>
                    ))
                  }
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
                      onChange={(e, value) => {
                        onChange({ target: { name: 'ccNumber', value } });
                        getCDSResponse(1000);
                        getCDSResponse(3000);
                      }}
                      onBlur={() => {
                        getCDSResponse(1000);
                        getCDSResponse(3000);
                      }}
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
                        if (ccNumber !== "" && !validCvv) return niceType ? CVVValidationMessage + "not valid..." + niceType + " requires " + cvvLength + " digits." : "not valid...";
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
                .filter((option, index, options) => {
                  if (options.length === 1 && billMe) return false;
                  return option;
                })
                .map((e, index, options) =>
                  (<ListItem
                    { ...(options.length > 1) && { leftAvatar: <Avatar style={{ marginTop: '10px' }} size={35}> {index + 1} </Avatar> } }
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
          open={demo}
          width="30%"
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
                onClick={() => onChange({ target: { name: 'MCToggle', value: !MCToggle } })}
              >
                <Checkbox
                  label="MC"
                  checked={MCToggle}
                  style={{ paddingLeft: 40 }}
                />
              </ListItem>
              <ListItem
                onClick={() => onChange({ target: { name: 'VIToggle', value: !VIToggle } })}
              >
                <Checkbox
                  label="VI"
                  checked={VIToggle}
                  style={{ paddingLeft: 40 }}
                />
              </ListItem>
              <ListItem
                onClick={() => onChange({ target: { name: 'AXToggle', value: !AXToggle } })}
              >
                <Checkbox
                  label="AX"
                  checked={AXToggle}
                  style={{ paddingLeft: 40 }}
                />
              </ListItem>
              <ListItem
                onClick={() => onChange({ target: { name: 'DIToggle', value: !DIToggle } })}
              >
                <Checkbox
                  label="DI"
                  checked={DIToggle}
                  style={{ paddingLeft: 40 }}
                />
              </ListItem>
              <ListItem
                onClick={() => onChange({ target: { name: 'DCToggle', value: !DCToggle } })}
              >
                <Checkbox
                  label="DC"
                  checked={DCToggle}
                  style={{ paddingLeft: 40 }}
                />
              </ListItem>
              <ListItem
                onClick={() => onChange({ target: { name: 'JCBToggle', value: !JCBToggle } })}
              >
                <Checkbox
                  label="JCB"
                  checked={JCBToggle}
                  style={{ paddingLeft: 40 }}
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
              <ListItem
              >
                <TextField
                  label="CVV Validation warning"
                  name='CVVValidationMessage'
                  style={{ paddingLeft: 20 }}
                  value={CVVValidationMessage}
                  onChange={onChange}
                //onChange={() => onChange({ target: { name: 'cvvToggle', value: !cvvToggle } })}
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
            <CardTitle title="React Lifecycle" />
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
                      {cipher}
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
                      {cardType}
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
                      {responseCode}
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
          <Card>
            <p align="center"><a href="http://demo.cds-payments.surge.sh/">"Demo"</a></p>
            <p align="center"><a href="http://cds-payments.surge.sh/"> "Prod"</a></p>
            <p align="center"><a href="https://repl.it/@joshmccall221/Payments">Repl</a></p>
          </Card>
          <Card>
            <CopyToClipboard
              //onCopy={this.onCopy}
              options={{ message: 'Whoa!' }}
              //text={markup}>
              text={markupChildren.join('')}>
              <button
                onClick={({ target: { innerHTML } }) => {
                  console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
                  const { props: { children: markupChildren } } = markup
                  console.log('\n\n\n', { markup }); // eslint-disable-line
                  console.log('\n\n\n', markupChildren.join('')); // eslint-disable-line
                }}
              >Click here to copy to clipboard!</button>
            </CopyToClipboard>
            <br /> <br />
            <TextField
              multiLine={true}
              value={markupChildren.join('')}
            />
          </Card>

        </Drawer>
      </div>
    </MuiThemeProvider >
  );
};
FuelSavingsForm.propTypes = {
  onSaveClick: func.isRequired,
  onChange: func.isRequired,
  fuelSavings: fuelSavings.isRequired
};

export default FuelSavingsForm;
