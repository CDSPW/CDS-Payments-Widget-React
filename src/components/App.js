/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import PaymentsPage from './containers/PaymentsPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <PaymentsPage />
        {false && <Switch>
          <Route exact path="/" component={PaymentsPage} />
          <Route component={PaymentsPage} />
        </Switch>}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
