import React from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import PropTypes from 'prop-types';

import DefaultError from './DefaultError';
import PostActions from '../actions/PostActions';
import Spinner from './Spinner';

class CategoryNavigation extends React.Component {

  componentDidMount() {
    PostActions.fetchPostsByCategories.defer();
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

    if (this.props.postsByCategories.length === 0) {
      return <Spinner />;
    }

    return (
      <ul>
        {this.props.postsByCategories.map(category => (
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
  postsByCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.shape({}),
};

CategoryNavigation.defaultProps = {
  error: null,
};

export default CategoryNavigation;
