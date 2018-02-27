import alt from '../alt';
import SiteActions from '../actions/SiteActions';

class SiteStore {
  constructor() {
    this.siteObj = null;
    this.error = null;

    this.bindActions(SiteActions);
  }

  onFetchSite() {
    // reset the object while we're fetching new data so React can
    // be smart and render a spinner for us since the data is empty.
    this.siteObj = null;
  }

  onSiteFailed(error) {
    this.error = error;
  }

  onUpdateSite(siteObj) {
    this.siteObj = siteObj;
    this.error = null;
  }
}

export default alt.createStore(SiteStore, 'SiteStore');
