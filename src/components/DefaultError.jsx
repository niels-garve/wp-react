import React from 'react';
import PropTypes from 'prop-types';

/**
 * a React stateless functional component
 * @see https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
 * @constructor
 */
const DefaultError = (props) => {
  console.log(props.error);

  if (!props.title) {
    return (
      <div className="default-error default-error--module">
        <span className="default-error__text">{props.text}</span>
      </div>
    );
  }

  return (
    <div className="l-container">
      <div className="default-error">
        <h1 className="default-error__headline">{props.title}</h1>
        <span className="default-error__text">{props.text}</span>
        <a href="/">Back to home</a>
      </div>
    </div>
  );
};

DefaultError.propTypes = {
  error: PropTypes.shape({}),
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
};

DefaultError.defaultProps = {
  error: null,
  title: null,
};

export default DefaultError;
