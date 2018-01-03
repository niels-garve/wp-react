/* eslint-disable class-methods-use-this */
import alt from '../alt';
import PageSource from '../sources/PageSource';

class PageActions {
  fetchPages() {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch();
      PageSource.fetch()
        .then((pages) => {
          this.updatePages(pages);
        })
        .catch((error) => {
          this.pagesFailed(error);
        });
    };
  }

  fetchRevisions(pageID) {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch(pageID);
      PageSource.fetchRevisions(pageID)
        .then((revisions) => {
          this.updateRevisions(pageID, revisions);
        })
        .catch((error) => {
          this.pagesFailed(error);
        });
    };
  }

  /**
   * can't be static due to altjs
   * @param error
   * @returns {Error}
   */
  pagesFailed(error) {
    return error;
  }

  /**
   * can't be static due to altjs
   * @param pages
   * @returns {[{}, {}]} page collection
   */
  updatePages(pages) {
    return pages;
  }

  /**
   * can't be static due to altjs
   * @param pageID
   * @param revisions
   * @returns {{pageID: *, revisions: *}}
   */
  updateRevisions(pageID, revisions) {
    return {
      pageID,
      revisions,
    };
  }
}

export default alt.createActions(PageActions);
