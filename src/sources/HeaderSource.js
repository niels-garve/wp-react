import wp from './wp';
import HeaderActions from '../actions/HeaderActions';

const HeaderSource = {
  fetchHeaders: {
    remote() {
      return wp.headers();
    },
    loading: HeaderActions.loadingHeaders,
    success: HeaderActions.receivedHeaders,
    error: HeaderActions.headersFailed,
  },

  fetchHeader: {
    remote(state, headerID) {
      return wp
        .headers()
        .id(headerID);
    },
    loading: HeaderActions.loadingHeader,
    success: HeaderActions.receivedHeader,
    error: HeaderActions.headersFailed,
  },

  fetchHeaderRevisions: {
    remote(state, headerID) {
      return wp
        .headers()
        .id(headerID)
        .revisions()
        .then(revisions => ({
          headerID,
          revisions,
        }));
    },
    loading: HeaderActions.loadingHeaderRevisions,
    success: HeaderActions.receivedHeaderRevisions,
    error: HeaderActions.headersFailed,
  },
};

export default HeaderSource;
