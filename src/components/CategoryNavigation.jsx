import React from 'react';
import PropTypes from 'prop-types';
import DefaultError from './DefaultError';
import PostActions from '../actions/PostActions';

class CategoryNavigation extends React.Component {

  componentDidMount() {
    PostActions.fetchPosts.defer();
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

    return (
      <ol>
        <li>
          <div>Category 1</div>
          <ul>
            <li>Sub-category 1</li>
            <li>Sub-category 2</li>
          </ul>
        </li>
        <li>
          <div>Category 2</div>
          <ul>
            <li>Sub-category 1</li>
            <li>Sub-category 2</li>
          </ul>
        </li>
      </ol>
    );
  }
}

CategoryNavigation.propTypes = {
  error: PropTypes.shape({}),
};

CategoryNavigation.defaultProps = {
  error: null,
};

export default CategoryNavigation;
