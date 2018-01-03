import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import AltContainer from 'alt-container';
import HeaderStore from '../stores/HeaderStore';
import PageStore from '../stores/PageStore';
import SiteStore from '../stores/SiteStore';

function withHeaderRevisions(Post) {
  class HeaderRevisions extends React.Component {

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

      if (!isNaN(postID) && params.post_type === 'headers') {
        /*
         * WordPress DRAFT preview
         */
        this.setState({
          revisionID: postID,
        });
      } else if (!isNaN(previewID) && this.props.match.params.id === 'headers') {
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
        <AltContainer
          stores={[PageStore, SiteStore, HeaderStore]}
          inject={{
            pages: () => PageStore.getState().pages,
            title: () => SiteStore.getState().siteObj.name,
            ...HeaderStore.getState(),
            ...this.state,
            ...this.props,
          }}
          component={Post}
        />
      );
    }
  }

  HeaderRevisions.propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  };

  HeaderRevisions.defaultProps = {
    match: {
      params: {
        id: '-1',
      },
    },
  };

  return withRouter(HeaderRevisions);
}

export default withHeaderRevisions;
