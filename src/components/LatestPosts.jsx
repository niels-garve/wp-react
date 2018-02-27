import React from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import PropTypes from 'prop-types';

import DefaultError from './DefaultError';
import PostActions from '../actions/PostActions';
import Spinner from './Spinner';

class LatestPosts extends React.Component {

  static buildThumbnail(post) {
    /* eslint-disable no-underscore-dangle */
    const thumbnail = post._embedded['wp:featuredmedia'][0].media_details.sizes['post-thumbnail'];
    const thumbnail2x = post._embedded['wp:featuredmedia'][0].media_details.sizes['post-thumbnail_2x'];

    return (
      <img
        height={thumbnail.height}
        width={thumbnail.width}
        src={thumbnail.source_url}
        alt={post._embedded['wp:featuredmedia'][0].alt_text}
        srcSet={`${thumbnail.source_url} ${thumbnail.width}w, ${thumbnail2x.source_url} ${thumbnail2x.width}w`}
        sizes="(min-width: 42em) 40em, calc(100vw - 2em)"
      />
    );
    /* eslint-enable no-underscore-dangle */
  }

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
      <ul className="latest-posts">
        {this.props.latestPosts.map(post => (
          <li key={`latest-post-${post.id}`}>
            <NavLink className="latest-posts__link" exact to={new URL(post.link).pathname}>
              {LatestPosts.buildThumbnail(post)}
              <span className="latest-posts__link-text">{post.title.rendered}</span>
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
