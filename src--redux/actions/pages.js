import wp from './wp';

export const REQUEST_PAGES = 'REQUEST_PAGES';
export const RECEIVE_PAGES = 'RECEIVE_PAGES';

const requestPages = () => ({
  type: REQUEST_PAGES,
});

const receivePages = pages => ({
  type: RECEIVE_PAGES,
  pages,
});

export const fetchPages = () => (dispatch) => {
  dispatch(requestPages());
  return wp
    .pages()
    .param('orderby', 'menu_order')
    .param('order', 'asc')
    .then(pages => dispatch(receivePages(pages)));
};
