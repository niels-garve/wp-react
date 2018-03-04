import alt from '../alt';
import SiteActions from '../actions/SiteActions';
import SiteSource from '../sources/SiteSource';

class SiteStore {
  constructor() {
    this.siteObj = null;
    this.error = null;

    this.bindActions(SiteActions);
    this.registerAsync(SiteSource);
  }

  onLoadingSite() {
    // reset the object while we're fetching new data so React can
    // be smart and render a spinner for us since the data is empty.
    this.siteObj = null;
  }

  onFetchingSiteFailed(error) {
    this.error = error;
  }

  onReceivedSite(siteObj) {
    this.siteObj = siteObj;
    this.error = null;
  }
}

export default alt.createStore(SiteStore, 'SiteStore');
