import _ from 'lodash';
import alt from '../alt';
import SidebarActions from '../actions/SidebarActions';

class SidebarStore {
  constructor() {
    this.sidebars = [];
    this.sidebarsRevisions = [];
    this.error = null;

    this.bindListeners({
      handleFetchSidebars: SidebarActions.fetchSidebars,
      handleFetchSidebar: SidebarActions.fetchSidebar,
      handleFetchRevisions: SidebarActions.fetchRevisions,
      handleSidebarsFailed: SidebarActions.sidebarsFailed,
      handleUpdateSidebars: SidebarActions.updateSidebars,
      handleUpdateSidebar: SidebarActions.updateSidebar,
      handleUpdateRevisions: SidebarActions.updateRevisions,
    });

    this.exportPublicMethods({
      getSidebarRevisions: this.getSidebarRevisions,
      getSidebarPreview: this.getSidebarPreview,
      getSidebar: this.getSidebar,
    });
  }

  handleFetchSidebars() {
    // reset the array while we're fetching new sidebars so React can
    // be smart and render a spinner for us since the data is empty.
    this.sidebars = [];
  }

  handleFetchSidebar(sidebarID) {
    const index = _.findIndex(this.sidebars, obj => obj.id === sidebarID);

    if (index === -1) {
      this.sidebars.push({
        id: sidebarID,
        isLoading: true,
      });
    } else {
      this.sidebars[index].isLoading = true;
    }
  }

  handleFetchRevisions(sidebarID) {
    const index = _.findIndex(this.sidebarsRevisions, obj => obj.id === sidebarID);

    if (index === -1) {
      this.sidebarsRevisions.push({
        id: sidebarID,
        revisions: [],
      });
    } else {
      this.sidebarsRevisions[index].revisions = [];
    }
  }

  handleSidebarsFailed(error) {
    this.error = error;
  }

  handleUpdateSidebars(sidebars) {
    this.sidebars = sidebars;
    this.error = null;
  }

  handleUpdateSidebar(sidebar) {
    this.sidebars = _.map(this.sidebars, (obj) => {
      if (obj.id === sidebar.id) {
        return sidebar;
      }

      return obj;
    });

    this.error = null;
  }

  handleUpdateRevisions(data) {
    const {
      sidebarID,
      revisions,
    } = data;

    this.sidebarsRevisions = _.map(this.sidebarsRevisions, (obj) => {
      if (obj.id === sidebarID) {
        return {
          ...obj,
          revisions,
        };
      }

      return obj;
    });

    this.error = null;
  }

  getSidebar(id) {
    return _.find(this.getState().sidebars, sidebar => sidebar.id === id) || null;
  }

  getSidebarRevisions(id) {
    const revisionsObj = _.find(this.getState().sidebarsRevisions, obj => obj.id === id);

    if (revisionsObj) {
      return revisionsObj.revisions;
    }

    return [];
  }

  getSidebarPreview(id) {
    const revisionsObj = _.find(this.getState().sidebarsRevisions, obj => obj.id === id);

    if (revisionsObj && revisionsObj.revisions.length > 0) {
      return revisionsObj.revisions[0];
    }

    return null;
  }
}

export default alt.createStore(SidebarStore, 'SidebarStore');
