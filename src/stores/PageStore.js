import _ from 'lodash';
import alt from '../alt';
import PageActions from '../actions/PageActions';

class PageStore {
  constructor() {
    this.pages = [];
    this.pagesRevisions = [];
    this.error = null;

    this.bindListeners({
      handleFetchPages: PageActions.fetchPages,
      handleFetchRevisions: PageActions.fetchRevisions,
      handlePagesFailed: PageActions.pagesFailed,
      handleUpdatePages: PageActions.updatePages,
      handleUpdateRevisions: PageActions.updateRevisions,
    });

    this.exportPublicMethods({
      getPageBySlug: this.getPageBySlug,
      getPageRevisions: this.getPageRevisions,
      getPagePreview: this.getPagePreview,
    });
  }

  handleFetchPages() {
    // reset the array while we're fetching new pages so React can
    // be smart and render a spinner for us since the data is empty.
    this.pages = [];
  }

  handleFetchRevisions(pageID) {
    const index = _.findIndex(this.pagesRevisions, obj => obj.id === pageID);

    if (index === -1) {
      this.pagesRevisions.push({
        id: pageID,
        revisions: [],
      });
    } else {
      this.pagesRevisions[index].revisions = [];
    }
  }

  handlePagesFailed(error) {
    this.error = error;
  }

  handleUpdatePages(pages) {
    this.pages = pages;
    this.error = null;
  }

  handleUpdateRevisions(data) {
    const {
      pageID,
      revisions,
    } = data;

    this.pagesRevisions = _.map(this.pagesRevisions, (obj) => {
      if (obj.id === pageID) {
        return {
          ...obj,
          revisions,
        };
      }

      return obj;
    });

    this.error = null;
  }

  getPageBySlug(slug) {
    return _.find(this.getState().pages, page => page.slug === slug) || null;
  }

  getPageRevisions(id) {
    const revisionsObj = _.find(this.getState().pagesRevisions, obj => obj.id === id);

    if (revisionsObj) {
      return revisionsObj.revisions;
    }

    return [];
  }

  getPagePreview(id) {
    const revisionsObj = _.find(this.getState().pagesRevisions, obj => obj.id === id);

    if (revisionsObj && revisionsObj.revisions.length > 0) {
      return revisionsObj.revisions[0];
    }

    return null;
  }
}

export default alt.createStore(PageStore, 'PageStore');
