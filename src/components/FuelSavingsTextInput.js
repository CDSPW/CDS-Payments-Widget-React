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

const { string, func } = PropTypes;

FuelSavingsTextInput.propTypes = {
  name: string,
  onChange: func,
  placeholder: string
};


export default FuelSavingsTextInput;
