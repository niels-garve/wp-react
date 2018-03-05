import React from 'react';
import PropTypes from 'prop-types';
import FooterStore from '../stores/FooterStore';

const Footer = (props) => {
  const footer = FooterStore.getFooter(props.id);

  return (
    <footer className="footer">
      <div className="l-container">
        {footer && 'Footer'}
      </div>
    </footer>
  );
};

Footer.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Footer;
