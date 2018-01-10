import React from 'react';
import PropTypes from 'prop-types';

const FuelSavingsTextInput = (...props) => {
  return (
    <input
    className="small"
      type="text"
      {...props[0]}
    />
  );
};

const { string, func, number, oneOfType } = PropTypes;

FuelSavingsTextInput.propTypes = {
  name: string.isRequired,
  onChange: func,
  placeholder: string,
  value: oneOfType([
    string,
    number
  ])
};

export default FuelSavingsTextInput;
