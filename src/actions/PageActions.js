import alt from '../alt';

class PageActions {
  constructor() {
    this.generateActions(
      'loadingPages',
      'receivedPages',
      'pagesFailed',
      'loadingPageRevisions',
      'receivedPageRevisions',
    );
  }
}

export default alt.createActions(PageActions);
