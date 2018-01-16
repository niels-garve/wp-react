import { connect } from 'react-redux';
import { fetchPages } from '../actions/pages';
import App from '../components/App';

const mapStateToProps = state => ({
  pages: state.pages.data,
});

const mapDispatchToProps = dispatch => ({
  onInit: () => {
    dispatch(fetchPages());
  },
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;
