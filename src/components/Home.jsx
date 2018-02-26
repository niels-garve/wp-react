import React from 'react';
import PropTypes from 'prop-types';
import AltContainer from 'alt-container';
import RichText from './RichText';
import withPageLayout from './withPageLayout';
import PostStore from '../stores/PostStore';
import LatestPosts from './LatestPosts';

const Home = props => (
  <div>
    <AltContainer store={PostStore} component={LatestPosts} />
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
