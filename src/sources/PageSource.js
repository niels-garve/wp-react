import wp from './wp';
import PageActions from '../actions/PageActions';

const PageSource = {
  fetchPages: {
    remote() {
      return Promise.all([
        wp.pages()
          .param('orderby', 'menu_order')
          .param('order', 'asc'),
        wp.headers(),
        wp.sidebars(),
        wp.footers(),
      ]).then(data => ({
        pages: data[0],
        headers: data[1],
        sidebars: data[2],
        footers: data[3],
      }));
    },
    loading: PageActions.loadingPages,
    success: PageActions.receivedPages,
    error: PageActions.pagesFailed,
  },

  fetchPageRevisions: {
    remote(state, pageID) {
      return wp
        .pages()
        .id(pageID)
        .revisions()
        .then(revisions => ({
          pageID,
          revisions,
        }));
    },
    loading: PageActions.loadingPageRevisions,
    success: PageActions.receivedPageRevisions,
    error: PageActions.pagesFailed,
  },
};

export default PageSource;
