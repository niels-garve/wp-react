import _ from 'lodash';
import alt from '../alt';
import SidebarActions from '../actions/SidebarActions';
import PageActions from '../actions/PageActions';
import SidebarSource from '../sources/SidebarSource';

class SidebarStore {
  constructor() {
    this.sidebars = [];
    this.sidebarsRevisions = [];
    this.error = null;

    this.bindActions(SidebarActions);
    this.bindListeners({
      handleLoadingPages: PageActions.LOADING_PAGES,
      handleReceivedPages: PageActions.RECEIVED_PAGES,
    });

    this.exportPublicMethods({
      getSidebar: this.getSidebar,
      getSidebarPreview: this.getSidebarPreview,
    });

    this.registerAsync(SidebarSource);
  }

  onLoadingSidebars() {
    this.sidebars = [];
  }

  onLoadingSidebar(sidebarID) {
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

  onLoadingSidebarRevisions(sidebarID) {
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

  handleLoadingPages() {
    this.sidebars = [];
  }

  onSidebarsFailed(error) {
    this.error = error;
  }

  onReceivedSidebars(sidebars) {
    this.sidebars = sidebars;
    this.error = null;
  }

  onReceivedSidebar(sidebar) {
    this.sidebars = _.map(this.sidebars, (obj) => {
      if (obj.id === sidebar.id) {
        return sidebar;
      }

      return obj;
    });

    this.error = null;
  }

  onReceivedSidebarRevisions(data) {
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

  handleReceivedPages(data) {
    const {
      sidebars,
    } = data;

    this.sidebars = sidebars;
    this.error = null;
  }

  getSidebar(id) {
    return _.find(this.getState().sidebars, sidebar => sidebar.id === id) || null;
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
