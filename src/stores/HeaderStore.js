import _ from 'lodash';
import alt from '../alt';
import HeaderActions from '../actions/HeaderActions';

class HeaderStore {
  constructor() {
    this.headers = [];
    this.headersRevisions = [];
    this.error = null;

    this.bindActions(HeaderActions);

    this.exportPublicMethods({
      getHeaderRevisions: this.getHeaderRevisions,
      getHeaderPreview: this.getHeaderPreview,
      getHeader: this.getHeader,
    });
  }

  onFetchHeaders() {
    // reset the array while we're fetching new headers so React can
    // be smart and render a spinner for us since the data is empty.
    this.headers = [];
  }

  onFetchHeader(headerID) {
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

  onFetchRevisions(headerID) {
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

  onHeadersFailed(error) {
    this.error = error;
  }

  onUpdateHeaders(headers) {
    this.headers = headers;
    this.error = null;
  }

  onUpdateHeader(header) {
    this.headers = _.map(this.headers, (obj) => {
      if (obj.id === header.id) {
        return header;
      }

      return obj;
    });

    this.error = null;
  }

  onUpdateRevisions(data) {
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

  getHeader(id) {
    return _.find(this.getState().headers, header => header.id === id) || null;
  }

  getHeaderRevisions(id) {
    const revisionsObj = _.find(this.getState().headersRevisions, obj => obj.id === id);

    if (revisionsObj) {
      return revisionsObj.revisions;
    }

    return [];
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
