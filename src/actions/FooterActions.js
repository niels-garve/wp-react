import alt from '../alt';

class FooterActions {
  constructor() {
    this.generateActions(
      'loadingFooters',
      'receivedFooters',
      'footersFailed',
      'loadingFooter',
      'receivedFooter',
    );
  }
}

export default alt.createActions(FooterActions);
