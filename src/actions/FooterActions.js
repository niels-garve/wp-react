/* eslint-disable class-methods-use-this */
import alt from '../alt';

class FooterActions {
  constructor() {
    this.generateActions(
      'loadingFooters',
      'receivedFooters',
      'footersFailed',
      'loadingFooter',
      'receivedFooter',
      'loadingFooterRevisions',
      'receivedFooterRevisions',
    );
  }
}

export default alt.createActions(FooterActions);
