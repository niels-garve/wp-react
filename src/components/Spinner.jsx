import React from 'react';
import PropTypes from 'prop-types';

const Spinner = props => (
  <div className={props.layoutModifier ? `spinner spinner--${props.layoutModifier}` : 'spinner'}>
    <div className="spinner__bounce spinner__bounce--1" />
    <div className="spinner__bounce spinner__bounce--2" />
    <div className="spinner__bounce" />
  </div>
);

Spinner.propTypes = {
  layoutModifier: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

Spinner.defaultProps = {
  layoutModifier: false,
};

export default Spinner;
