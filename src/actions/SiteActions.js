/* eslint-disable class-methods-use-this */
import alt from '../alt';
import SiteSource from '../sources/SiteSource';

class SiteActions {
  fetchSite() {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch();
      SiteSource.fetch()
        .then((siteObj) => {
          this.updateSite(siteObj);
        })
        .catch((error) => {
          this.siteFailed(error);
        });
    };
  }

  /**
   * can't be static due to altjs
   * @param error
   * @returns {Error}
   */
  siteFailed(error) {
    return error;
  }

  /**
   * can't be static due to altjs
   * @param siteObj
   * @returns {Object}
   */
  updateSite(siteObj) {
    return siteObj;
  }
}

export default alt.createActions(SiteActions);
