import wp from './wp';

class PageSource {
  static fetch() {
    return wp
      .pages()
      .param('orderby', 'menu_order')
      .param('order', 'asc');
  }

  static fetchRevisions(pageID) {
    return wp
      .pages()
      .id(pageID)
      .revisions();
  }
}

export default PageSource;
