import wp from './wp';

class SidebarSource {
  static fetch() {
    return wp.sidebars();
  }

  static fetchSidebar(sidebarID) {
    return wp
      .sidebars()
      .id(sidebarID);
  }

  static fetchRevisions(sidebarID) {
    return wp
      .sidebars()
      .id(sidebarID)
      .revisions();
  }
}

export default SidebarSource;
