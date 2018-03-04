import _ from 'lodash';
import alt from '../alt';
import FooterActions from '../actions/FooterActions';
import PageActions from '../actions/PageActions';
import FooterSource from '../sources/FooterSource';

class FooterStore {
  constructor() {
    this.footers = [];
    this.footersRevisions = [];
    this.error = null;

    this.bindActions(FooterActions);
    this.bindListeners({
      handleLoadingPages: PageActions.LOADING_PAGES,
      handleReceivedPages: PageActions.RECEIVED_PAGES,
    });

    this.exportPublicMethods({
      getFooter: this.getFooter,
      getFooterPreview: this.getFooterPreview,
    });

    this.registerAsync(FooterSource);
  }

  onLoadingFooters() {
    this.footers = [];
  }

  onLoadingFooter(footerID) {
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

  onLoadingFooterRevisions(footerID) {
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

  handleLoadingPages() {
    this.footers = [];
  }

  onFootersFailed(error) {
    this.error = error;
  }

  onReceivedFooters(footers) {
    this.footers = footers;
    this.error = null;
  }

  onReceivedFooter(footer) {
    this.footers = _.map(this.footers, (obj) => {
      if (obj.id === footer.id) {
        return footer;
      }

      return obj;
    });

    this.error = null;
  }

  onReceivedFooterRevisions(data) {
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

  handleReceivedPages(data) {
    const {
      footers,
    } = data;

    this.footers = footers;
    this.error = null;
  }

  getFooter(id) {
    return _.find(this.getState().footers, footer => footer.id === id) || null;
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
