import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import AltContainer from 'alt-container';
import PostStore from '../stores/PostStore';

function withPostRevisions(Post) {
  class PostRevisions extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        revisionID: -1,
      };
    }

    componentWillMount() {
      const params = queryString.parse(this.props.location.search);

      // "fast" return
      if (params.preview !== 'true') {
        return;
      }

      const postID = parseInt(params.p, 10);
      const previewID = parseInt(params.preview_id, 10);
      const postType = parseInt(this.props.match.params.id, 10);

      if (!isNaN(postID) && typeof params.post_type === 'undefined') {
        /*
         * WordPress DRAFT preview
         */
        this.setState({
          revisionID: postID,
        });
      } else if (!isNaN(previewID) && previewID === postType) {
        /*
         * WordPress preview
         */
        this.setState({
          revisionID: previewID,
        });
      }
    }

    render() {
      return (
        <AltContainer store={PostStore}>
          <Post
            {...this.state}
            {...this.props}
          />
        </AltContainer>
      );
    }
  }

  PostRevisions.propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  };

  PostRevisions.defaultProps = {
    match: {
      params: {
        id: '-1',
      },
    },
  };

  return withRouter(PostRevisions);
}

export default withPostRevisions;
