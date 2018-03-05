import _ from 'lodash';
import alt from '../alt';
import SidebarActions from '../actions/SidebarActions';
import PageActions from '../actions/PageActions';
import SidebarSource from '../sources/SidebarSource';

class SidebarStore {
  constructor() {
    this.sidebars = [];
    this.error = null;

    this.bindActions(SidebarActions);
    this.bindListeners({
      handleLoadingPages: PageActions.LOADING_PAGES,
      handleReceivedPages: PageActions.RECEIVED_PAGES,
    });

    this.exportPublicMethods({
      getSidebar: this.getSidebar,
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
}

export default alt.createStore(SidebarStore, 'SidebarStore');
