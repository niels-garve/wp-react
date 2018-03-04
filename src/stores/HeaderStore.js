import _ from 'lodash';
import alt from '../alt';
import HeaderActions from '../actions/HeaderActions';
import PageActions from '../actions/PageActions';
import HeaderSource from '../sources/HeaderSource';

class HeaderStore {
  constructor() {
    this.headers = [];
    this.headersRevisions = [];
    this.error = null;

    this.bindActions(HeaderActions);
    this.bindListeners({
      handleLoadingPages: PageActions.LOADING_PAGES,
      handleReceivedPages: PageActions.RECEIVED_PAGES,
    });

    this.exportPublicMethods({
      getHeader: this.getHeader,
      getHeaderPreview: this.getHeaderPreview,
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

  onLoadingHeaderRevisions(headerID) {
    const index = _.findIndex(this.headersRevisions, obj => obj.id === headerID);

    if (index === -1) {
      this.headersRevisions.push({
        id: headerID,
        revisions: [],
      });
    } else {
      this.headersRevisions[index].revisions = [];
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

  onReceivedHeaderRevisions(data) {
    const {
      headerID,
      revisions,
    } = data;

    this.headersRevisions = _.map(this.headersRevisions, (obj) => {
      if (obj.id === headerID) {
        return {
          ...obj,
          revisions,
        };
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

  getHeaderPreview(id) {
    const revisionsObj = _.find(this.getState().headersRevisions, obj => obj.id === id);

    if (revisionsObj && revisionsObj.revisions.length > 0) {
      return revisionsObj.revisions[0];
    }

    return null;
  }
}

export default alt.createStore(HeaderStore, 'HeaderStore');
