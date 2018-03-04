/* eslint-disable class-methods-use-this */
import alt from '../alt';

class HeaderActions {
  constructor() {
    this.generateActions(
      'loadingHeaders',
      'receivedHeaders',
      'headersFailed',
      'loadingHeader',
      'receivedHeader',
      'loadingHeaderRevisions',
      'receivedHeaderRevisions',
    );
  }
}

export default alt.createActions(HeaderActions);
