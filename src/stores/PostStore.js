import alt from '../alt';
import PostActions from '../actions/PostActions';
import AbstractPostStore from './AbstractPostStore';

class PostStore extends AbstractPostStore {
  constructor() {
    super();

    this.bindListeners({
      handleFetchPosts: PostActions.fetchPosts,
      handleFetchAllPosts: PostActions.fetchAllPosts,
      handleFetchPost: PostActions.fetchPost,
      handleFetchRevisions: PostActions.fetchRevisions,
      handlePostsFailed: PostActions.postsFailed,
      handleUpdatePosts: PostActions.updatePosts,
      handleUpdateAllPosts: PostActions.updateAllPosts,
      handleUpdatePost: PostActions.updatePost,
      handleUpdateRevisions: PostActions.updateRevisions,
    });

    this.exportPublicMethods({
      getPost: this.getPost,
      getPostRevisions: this.getPostRevisions,
      getPostPreview: this.getPostPreview,
    });
  }
}

export default alt.createStore(PostStore, 'PostStore');
