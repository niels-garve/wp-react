import alt from '../alt';
import PostActions from '../actions/PostActions';
import AbstractPostStore from './AbstractPostStore';

class PostStore extends AbstractPostStore {
  constructor() {
    super();

    this.bindActions(PostActions);
  }
}

export default alt.createStore(PostStore, 'PostStore');
