import alt from '../alt';
import SiteActions from '../actions/SiteActions';

class SiteStore {
  constructor() {
    this.siteObj = null;
    this.error = null;

    this.bindListeners({
      handleFetchSite: SiteActions.fetchSite,
      handleSiteFailed: SiteActions.siteFailed,
      handleUpdateSite: SiteActions.updateSite,
    });
  }

  handleFetchSite() {
    // reset the object while we're fetching new data so React can
    // be smart and render a spinner for us since the data is empty.
    this.siteObj = null;
  }

  handleSiteFailed(error) {
    this.error = error;
  }

  handleUpdateSite(siteObj) {
    this.siteObj = siteObj;
    this.error = null;
  }
}

export default alt.createStore(SiteStore, 'SiteStore');
