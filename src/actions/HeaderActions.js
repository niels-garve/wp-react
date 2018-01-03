/* eslint-disable class-methods-use-this */
import alt from '../alt';
import HeaderSource from '../sources/HeaderSource';

class HeaderActions {
  fetchHeaders() {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch();
      HeaderSource.fetch()
        .then((headers) => {
          this.updateHeaders(headers);
        })
        .catch((error) => {
          this.headersFailed(error);
        });
    };
  }

  fetchHeader(headerID) {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch(headerID);
      HeaderSource.fetchHeader(headerID)
        .then((header) => {
          this.updateHeader(header);
        })
        .catch((error) => {
          this.headersFailed(error);
        });
    };
  }

  fetchRevisions(headerID) {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch(headerID);
      HeaderSource.fetchRevisions(headerID)
        .then((revisions) => {
          this.updateRevisions(headerID, revisions);
        })
        .catch((error) => {
          this.headersFailed(error);
        });
    };
  }

  /**
   * can't be static due to altjs
   * @param error
   * @returns {Error}
   */
  headersFailed(error) {
    return error;
  }

  /**
   * can't be static due to altjs
   * @param headers
   * @returns {[{}, {}]} header collection
   */
  updateHeaders(headers) {
    return headers;
  }

  /**
   * can't be static due to altjs
   * @param header
   * @returns {*}
   */
  updateHeader(header) {
    return header;
  }

  /**
   * can't be static due to altjs
   * @param headerID
   * @param revisions
   * @returns {{headerID: *, revisions: *}}
   */
  updateRevisions(headerID, revisions) {
    return {
      headerID,
      revisions,
    };
  }
}

export default alt.createActions(HeaderActions);
