/* eslint-disable class-methods-use-this */
import alt from '../alt';
import SidebarSource from '../sources/SidebarSource';

class SidebarActions {
  fetchSidebars() {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch();
      SidebarSource.fetch()
        .then((sidebars) => {
          this.updateSidebars(sidebars);
        })
        .catch((error) => {
          this.sidebarsFailed(error);
        });
    };
  }

  fetchSidebar(sidebarID) {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch(sidebarID);
      SidebarSource.fetchSidebar(sidebarID)
        .then((sidebar) => {
          this.updateSidebar(sidebar);
        })
        .catch((error) => {
          this.sidebarsFailed(error);
        });
    };
  }

  fetchRevisions(sidebarID) {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch(sidebarID);
      SidebarSource.fetchRevisions(sidebarID)
        .then((revisions) => {
          this.updateRevisions(sidebarID, revisions);
        })
        .catch((error) => {
          this.sidebarsFailed(error);
        });
    };
  }

  /**
   * can't be static due to altjs
   * @param error
   * @returns {Error}
   */
  sidebarsFailed(error) {
    return error;
  }

  /**
   * can't be static due to altjs
   * @param sidebars
   * @returns {[{}, {}]} sidebar collection
   */
  updateSidebars(sidebars) {
    return sidebars;
  }

  /**
   * can't be static due to altjs
   * @param sidebar
   * @returns {*}
   */
  updateSidebar(sidebar) {
    return sidebar;
  }

  /**
   * can't be static due to altjs
   * @param sidebarID
   * @param revisions
   * @returns {{sidebarID: *, revisions: *}}
   */
  updateRevisions(sidebarID, revisions) {
    return {
      sidebarID,
      revisions,
    };
  }
}

export default alt.createActions(SidebarActions);
