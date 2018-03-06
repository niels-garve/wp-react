import alt from '../alt';

class HeaderActions {
  constructor() {
    this.generateActions(
      'loadingHeaders',
      'receivedHeaders',
      'headersFailed',
      'loadingHeader',
      'receivedHeader',
    );
  }
}

export default alt.createActions(HeaderActions);
