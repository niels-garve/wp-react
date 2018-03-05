import _ from 'lodash';
import alt from '../alt';
import HeaderActions from '../actions/HeaderActions';
import PageActions from '../actions/PageActions';
import HeaderSource from '../sources/HeaderSource';

class HeaderStore {
  constructor() {
    this.headers = [];
    this.error = null;

    this.bindActions(HeaderActions);
    this.bindListeners({
      handleLoadingPages: PageActions.LOADING_PAGES,
      handleReceivedPages: PageActions.RECEIVED_PAGES,
    });

    this.exportPublicMethods({
      getHeader: this.getHeader,
    });

    this.registerAsync(HeaderSource);
  }

  onLoadingHeaders() {
    this.headers = [];
  }

  onLoadingHeader(headerID) {
    const index = _.findIndex(this.headers, obj => obj.id === headerID);

    if (index === -1) {
      this.headers.push({
        id: headerID,
        isLoading: true,
      });
    } else {
      this.headers[index].isLoading = true;
    }
  }

  handleLoadingPages() {
    this.headers = [];
  }

  onHeadersFailed(error) {
    this.error = error;
  }

  onReceivedHeaders(headers) {
    this.headers = headers;
    this.error = null;
  }

  onReceivedHeader(header) {
    this.headers = _.map(this.headers, (obj) => {
      if (obj.id === header.id) {
        return header;
      }

      return obj;
    });

    this.error = null;
  }

  handleReceivedPages(data) {
    const {
      headers,
    } = data;

    this.headers = headers;
    this.error = null;
  }

  getHeader(id) {
    return _.find(this.getState().headers, header => header.id === id) || null;
  }
}

export default alt.createStore(HeaderStore, 'HeaderStore');
