import React from 'react';
import PropTypes from 'prop-types';
import AltContainer from 'alt-container';

import Spinner from './Spinner';
import DefaultError from './DefaultError';
import SidebarActions from '../actions/SidebarActions';
import SidebarStore from '../stores/SidebarStore';
import withSidebarRevisions from './withSidebarRevisions';
import PostStore from '../stores/PostStore';
import CategoryNavigation from './CategoryNavigation';

class Sidebar extends React.Component {

  componentDidMount() {
    if (this.props.revisionID === -1) {
      SidebarActions.fetchSidebar.defer(this.props.id);
    } else {
      SidebarActions.fetchRevisions.defer(this.props.revisionID);
    }
  }

  buildSidebar() {
    if (this.props.error !== null) {
      return (
        <DefaultError
          text="Sorry, we could not load the sidebar."
          error={this.props.error}
        />
      );
    }

    let sidebar = null;

    if (this.props.revisionID === -1) {
      sidebar = SidebarStore.getSidebar(this.props.id);
    } else {
      sidebar = SidebarStore.getSidebarPreview(this.props.revisionID);
    }

    if (sidebar === null || sidebar.isLoading) {
      return <Spinner />;
    }

    return (
      <h2>{sidebar.title.rendered}</h2>
    );
  }

  /**
   * If you have a single component and you’re using required propTypes then this is a legitimate
   * way of rendering the components without getting a warning about invalid propTypes from React
   * due to cloneWithProps.
   * @returns {XML}
   * @see http://alt.js.org/docs/components/altContainer/
   */
  render() {
    return (
      <aside className="l-main__side-content">
        {this.buildSidebar()}
        <AltContainer store={PostStore} component={CategoryNavigation} />
      </aside>
    );
  }
}

Sidebar.propTypes = {
  id: PropTypes.number.isRequired,
  revisionID: PropTypes.number.isRequired,
  error: PropTypes.shape({}),
};

Sidebar.defaultProps = {
  error: null,
};


export default withSidebarRevisions(Sidebar);
