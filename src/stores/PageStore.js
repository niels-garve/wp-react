import _ from 'lodash';
import alt from '../alt';
import PageActions from '../actions/PageActions';
import PageSource from '../sources/PageSource';
import HeaderStore from './HeaderStore';
import SidebarStore from './SidebarStore';
import FooterStore from './FooterStore';

class PageStore {
  constructor() {
    this.pages = [];
    this.pagesRevisions = [];
    this.error = null;

    this.bindActions(PageActions);

    this.exportPublicMethods({
      getPage: this.getPage,
      getPagePreview: this.getPagePreview,
    });

    this.registerAsync(PageSource);
  }

  onLoadingPages() {
    this.pages = [];
  }

  onPagesFailed(error) {
    this.error = error;
  }

  onReceivedPages(data) {
    this.waitFor([HeaderStore, SidebarStore, FooterStore]);

    const {
      pages,
    } = data;

    this.pages = _(pages)
      .map(page => ({
        ...page,
        header: (page.acf.header) ? HeaderStore.getHeader(page.acf.header.ID) : null,
        sidebar: (page.acf.sidebar) ? SidebarStore.getSidebar(page.acf.sidebar.ID) : null,
        footer: (page.acf.footer) ? FooterStore.getFooter(page.acf.footer.ID) : null,
      }))
      .value();

    this.error = null;
  }

  onReceivedPageRevisions(data) {
    const {
      pageID,
      revisions,
    } = data;
    const index = _.findIndex(this.pagesRevisions, obj => obj.id === pageID);

    if (index === -1) {
      this.pagesRevisions.push({
        id: pageID,
        revisions,
      });
    } else {
      this.pagesRevisions[index].revisions = revisions;
    }

    this.error = null;
  }

  getPage(id) {
    return _.find(this.getState().pages, page => page.id === id) || null;
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
