import wp from './wp';

class FooterSource {
  static fetch() {
    return wp.footers();
  }

  static fetchFooter(footerID) {
    return wp
      .footers()
      .id(footerID);
  }

  static fetchRevisions(footerID) {
    return wp
      .footers()
      .id(footerID)
      .revisions();
  }
}

export default FooterSource;
