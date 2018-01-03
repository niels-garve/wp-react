import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import AltContainer from 'alt-container';
import FooterStore from '../stores/FooterStore';

function withFooterRevisions(Post) {
  class FooterRevisions extends React.Component {

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

      if (!isNaN(postID) && params.post_type === 'footers') {
        /*
         * WordPress DRAFT preview
         */
        this.setState({
          revisionID: postID,
        });
      } else if (!isNaN(previewID) && this.props.match.params.id === 'footers') {
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
        <AltContainer store={FooterStore}>
          <Post
            {...this.state}
            {...this.props}
          />
        </AltContainer>
      );
    }
  }

  FooterRevisions.propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  };

  FooterRevisions.defaultProps = {
    match: {
      params: {
        id: '-1',
      },
    },
  };

  return withRouter(FooterRevisions);
}

export default withFooterRevisions;
