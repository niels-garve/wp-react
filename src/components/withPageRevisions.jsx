import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import PageActions from '../actions/PageActions';

function withPageRevisions(Page) {
  class PageRevisions extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        revisionID: -1,
      };
    }

    componentWillMount() {
      const params = queryString.parse(this.props.location.search);

      if (params.preview !== 'true') {
        return;
      }

      const pageID = parseInt(params.page_id, 10);
      const previewID = parseInt(params.preview_id, 10);

      // draft preview
      if (!isNaN(pageID)) {
        /*
         * WordPress DRAFT preview
         */
        this.setState({
          revisionID: pageID,
        });

        PageActions.fetchRevisions.defer(pageID);
      } else if (!isNaN(previewID) && this.props.match.path === `/${this.props.slug}`) {
        /*
         * WordPress preview
         */
        this.setState({
          revisionID: previewID,
        });

        PageActions.fetchRevisions.defer(previewID);
      }
    }

    render() {
      return (
        <Page
          {...this.state}
          {...this.props}
        />
      );
    }
  }

  PageRevisions.propTypes = {
    slug: PropTypes.string.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  };

  return withRouter(PageRevisions);
}

export default withPageRevisions;
