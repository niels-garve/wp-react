import alt from '../alt';

class SiteActions {
  constructor() {
    this.generateActions(
      'loadingSite',
      'receivedSite',
      'fetchingSiteFailed',
    );
  }
}

export default alt.createActions(SiteActions);
