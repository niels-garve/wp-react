import alt from '../alt';
import NewsActions from '../actions/NewsActions';
import AbstractPostStore from './AbstractPostStore';

class NewsStore extends AbstractPostStore {
  constructor() {
    super();

    this.bindListeners({
      handleFetchPosts: NewsActions.fetchPosts,
      handleFetchPost: NewsActions.fetchPost,
      handleFetchRevisions: NewsActions.fetchRevisions,
      handlePostsFailed: NewsActions.postsFailed,
      handleUpdatePosts: NewsActions.updatePosts,
      handleUpdatePost: NewsActions.updatePost,
      handleUpdateRevisions: NewsActions.updateRevisions,
    });

    this.exportPublicMethods({
      getPost: this.getPost,
      getPostRevisions: this.getPostRevisions,
      getPostPreview: this.getPostPreview,
    });
  }
}

export default alt.createStore(NewsStore, 'NewsStore');
