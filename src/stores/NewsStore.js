import alt from '../alt';
import NewsActions from '../actions/NewsActions';
import AbstractPostStore from './AbstractPostStore';

class NewsStore extends AbstractPostStore {
  constructor() {
    super();

    this.bindActions(NewsActions);

    this.exportPublicMethods({
      getPost: this.getPost,
      getPostRevisions: this.getPostRevisions,
      getPostPreview: this.getPostPreview,
    });
  }
}

export default alt.createStore(NewsStore, 'NewsStore');
