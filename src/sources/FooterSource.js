import wp from './wp';
import FooterActions from '../actions/FooterActions';

const FooterSource = {
  fetchFooters: {
    remote() {
      return wp.footers();
    },
    loading: FooterActions.loadingFooters,
    success: FooterActions.receivedFooters,
    error: FooterActions.footersFailed,
  },

  fetchFooter: {
    remote(state, footerID) {
      return wp
        .footers()
        .id(footerID);
    },
    loading: FooterActions.loadingFooter,
    success: FooterActions.receivedFooter,
    error: FooterActions.footersFailed,
  },
};

export default FooterSource;
