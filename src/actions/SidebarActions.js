/* eslint-disable class-methods-use-this */
import alt from '../alt';

class SidebarActions {
  constructor() {
    this.generateActions(
      'loadingSidebars',
      'receivedSidebars',
      'sidebarsFailed',
      'loadingSidebar',
      'receivedSidebar',
      'loadingSidebarRevisions',
      'receivedSidebarRevisions',
    );
  }
}

export default alt.createActions(SidebarActions);
