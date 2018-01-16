import { REQUEST_PAGES, RECEIVE_PAGES } from '../actions/pages';

const pages = (state = {
  isLoading: true,
  data: [],
}, action) => {
  switch (action.type) {
    case REQUEST_PAGES:
      return {
        ...state,
        data: [],
        isLoading: true,
      };
    case RECEIVE_PAGES:
      return {
        ...state,
        data: action.pages,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default pages;
