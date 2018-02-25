import React from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import PropTypes from 'prop-types';

import DefaultError from './DefaultError';
import PostActions from '../actions/PostActions';
import Spinner from './Spinner';

class CategoryNavigation extends React.Component {

  componentDidMount() {
    PostActions.fetchAllPosts.defer();
  }

  render() {
    if (this.props.error !== null) {
      return (
        <DefaultError
          text="Sorry, we could not load our categories."
          error={this.props.error}
        />
      );
    }

    if (this.props.allPosts.length === 0) {
      return <Spinner />;
    }

    return (
      <ul>
        {this.props.allPosts.map(category => (
          <li key={`category-${category.id}`}>
            <h3>{category.name}</h3>
            <ul>
              {category.posts.map(post => (
                <li key={`category-${category.id}-post-${post.id}`}>
                  <NavLink exact to={new URL(post.link).pathname}>
                    {post.title.rendered}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}

CategoryNavigation.propTypes = {
  allPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.shape({}),
};

CategoryNavigation.defaultProps = {
  error: null,
};

export default CategoryNavigation;
