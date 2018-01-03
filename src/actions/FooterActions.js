/* eslint-disable class-methods-use-this */
import alt from '../alt';
import FooterSource from '../sources/FooterSource';

class FooterActions {
  fetchFooters() {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch();
      FooterSource.fetch()
        .then((footers) => {
          this.updateFooters(footers);
        })
        .catch((error) => {
          this.footersFailed(error);
        });
    };
  }

  fetchFooter(footerID) {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch(footerID);
      FooterSource.fetchFooter(footerID)
        .then((footer) => {
          this.updateFooter(footer);
        })
        .catch((error) => {
          this.footersFailed(error);
        });
    };
  }

  fetchRevisions(footerID) {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch(footerID);
      FooterSource.fetchRevisions(footerID)
        .then((revisions) => {
          this.updateRevisions(footerID, revisions);
        })
        .catch((error) => {
          this.footersFailed(error);
        });
    };
  }

  /**
   * can't be static due to altjs
   * @param error
   * @returns {Error}
   */
  footersFailed(error) {
    return error;
  }

  /**
   * can't be static due to altjs
   * @param footers
   * @returns {[{}, {}]} footer collection
   */
  updateFooters(footers) {
    return footers;
  }

  /**
   * can't be static due to altjs
   * @param footer
   * @returns {*}
   */
  updateFooter(footer) {
    return footer;
  }

  /**
   * can't be static due to altjs
   * @param footerID
   * @param revisions
   * @returns {{footerID: *, revisions: *}}
   */
  updateRevisions(footerID, revisions) {
    return {
      footerID,
      revisions,
    };
  }
}

export default alt.createActions(FooterActions);
