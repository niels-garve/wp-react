import wp from './wp';

class HeaderSource {
  static fetch() {
    return wp.headers();
  }

  static fetchHeader(headerID) {
    return wp
      .headers()
      .id(headerID);
  }

  static fetchRevisions(headerID) {
    return wp
      .headers()
      .id(headerID)
      .revisions();
  }
}

export default HeaderSource;
