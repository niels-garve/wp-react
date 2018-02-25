import React from 'react';
import PropTypes from 'prop-types';
import RichText from './RichText';
import withPageLayout from './withPageLayout';

const Home = props => (
  <div>
    <RichText html={props.page.content.rendered} />
  </div>
);

Home.propTypes = {
  page: PropTypes.shape({
    content: PropTypes.shape({
      rendered: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withPageLayout(Home);
