import wp from './wp';

class PageSource {
  static fetch() {
    return wp.pages();
  }

  static fetchRevisions(pageID) {
    return wp
      .pages()
      .id(pageID)
      .revisions();
  }
}

export default PageSource;
