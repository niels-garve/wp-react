import wp from './wp';
import SidebarActions from '../actions/SidebarActions';

const SidebarSource = {
  fetchSidebars: {
    remote() {
      return wp.sidebars();
    },
    loading: SidebarActions.loadingSidebars,
    success: SidebarActions.receivedSidebars,
    error: SidebarActions.sidebarsFailed,
  },

  fetchSidebar: {
    remote(state, sidebarID) {
      return wp
        .sidebars()
        .id(sidebarID);
    },
    loading: SidebarActions.loadingSidebar,
    success: SidebarActions.receivedSidebar,
    error: SidebarActions.sidebarsFailed,
  },
};

export default SidebarSource;
