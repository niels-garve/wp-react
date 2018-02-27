import _ from 'lodash';
import alt from '../alt';
import FooterActions from '../actions/FooterActions';

class FooterStore {
  constructor() {
    this.footers = [];
    this.footersRevisions = [];
    this.error = null;

    this.bindActions(FooterActions);

    this.exportPublicMethods({
      getFooterRevisions: this.getFooterRevisions,
      getFooterPreview: this.getFooterPreview,
      getFooter: this.getFooter,
    });
  }

  onFetchFooters() {
    // reset the array while we're fetching new footers so React can
    // be smart and render a spinner for us since the data is empty.
    this.footers = [];
  }

  onFetchFooter(footerID) {
    const index = _.findIndex(this.footers, obj => obj.id === footerID);

    if (index === -1) {
      this.footers.push({
        id: footerID,
        isLoading: true,
      });
    } else {
      this.footers[index].isLoading = true;
    }
  }

  onFetchRevisions(footerID) {
    const index = _.findIndex(this.footersRevisions, obj => obj.id === footerID);

    if (index === -1) {
      this.footersRevisions.push({
        id: footerID,
        revisions: [],
      });
    } else {
      this.footersRevisions[index].revisions = [];
    }
  }

  onFootersFailed(error) {
    this.error = error;
  }

  onUpdateFooters(footers) {
    this.footers = footers;
    this.error = null;
  }

  onUpdateFooter(footer) {
    this.footers = _.map(this.footers, (obj) => {
      if (obj.id === footer.id) {
        return footer;
      }

      return obj;
    });

    this.error = null;
  }

  onUpdateRevisions(data) {
    const {
      footerID,
      revisions,
    } = data;

    this.footersRevisions = _.map(this.footersRevisions, (obj) => {
      if (obj.id === footerID) {
        return {
          ...obj,
          revisions,
        };
      }

      return obj;
    });

    this.error = null;
  }

  getFooter(id) {
    return _.find(this.getState().footers, footer => footer.id === id) || null;
  }

  getFooterRevisions(id) {
    const revisionsObj = _.find(this.getState().footersRevisions, obj => obj.id === id);

    if (revisionsObj) {
      return revisionsObj.revisions;
    }

    return [];
  }

  getFooterPreview(id) {
    const revisionsObj = _.find(this.getState().footersRevisions, obj => obj.id === id);

    if (revisionsObj && revisionsObj.revisions.length > 0) {
      return revisionsObj.revisions[0];
    }

    return null;
  }
}

export default alt.createStore(FooterStore, 'FooterStore');
