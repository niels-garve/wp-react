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
};

export default HeaderSource;
