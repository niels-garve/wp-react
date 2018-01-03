import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import DefaultError from './DefaultError';
import SidebarActions from '../actions/SidebarActions';
import SidebarStore from '../stores/SidebarStore';
import withSidebarRevisions from './withSidebarRevisions';

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

  render() {
    return (
      <aside className="l-main__side-content">
        {this.buildSidebar()}
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
