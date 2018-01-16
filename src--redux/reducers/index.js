import { combineReducers } from 'redux';
import pages from './pages';

const appReducer = combineReducers({
  pages,
});

export default appReducer;
