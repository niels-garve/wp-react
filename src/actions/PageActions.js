import alt from '../alt';

class PageActions {
  constructor() {
    this.generateActions(
      'loadingPages',
      'receivedPages',
      'pagesFailed',
      'receivedPageRevisions',
    );
  }
}

export default alt.createActions(PageActions);
