import React from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import PropTypes from 'prop-types';

import DefaultError from './DefaultError';
import PostActions from '../actions/PostActions';
import Spinner from './Spinner';

class LatestPosts extends React.Component {

  componentDidMount() {
    PostActions.fetchLatestPosts.defer();
  }

  render() {
    if (this.props.error !== null) {
      return (
        <DefaultError
          text="Sorry, we could not load our latest posts."
          error={this.props.error}
        />
      );
    }

    if (this.props.latestPosts.length === 0) {
      return <Spinner />;
    }

    return (
      <ul className="gallery">
        {this.props.latestPosts.map(post => (
          <li className="gallery__item" key={`latest-post-${post.id}`}>
            <NavLink className="gallery__link" exact to={new URL(post.link).pathname}>
              {/* TODO implement responsive thumbnails (don't forget to add 'post-thumbnail_2x') */}
              {/* eslint-disable no-underscore-dangle */}
              <img
                className="latest-posts__img"
                src={post._embedded['wp:featuredmedia'][0].media_details.sizes['post-thumbnail'].source_url}
                alt={post._embedded['wp:featuredmedia'][0].alt_text}
              />
              {/* eslint-enable no-underscore-dangle */}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

LatestPosts.propTypes = {
  latestPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.shape({}),
};

LatestPosts.defaultProps = {
  error: null,
};

export default LatestPosts;
