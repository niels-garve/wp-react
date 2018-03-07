import alt from '../alt';
import PostSource from '../sources/PostSource';

class PostActions {

  constructor(category) {
    this.category = category || 'uncategorized';

    this.generateActions(
      'postsFailed',
      'updatePosts',
      'updatePostsByCategories',
      'updateLatestPosts',
      'updatePost',
      'updatePreview',
    );
  }

  fetchPosts(page = 1) {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch(page);
      PostSource.fetch(this.category, page)
        .then((posts) => {
          this.updatePosts({
            page,
            posts,
            paging: posts._paging, // eslint-disable-line no-underscore-dangle
          });
        })
        .catch((error) => {
          this.postsFailed(error);
        });
    };
  }

  fetchPostsByCategories() {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch();
      PostSource.fetchPostsByCategories()
        .then((posts) => {
          this.updatePostsByCategories(posts);
        })
        .catch((error) => {
          this.postsFailed(error);
        });
    };
  }

  fetchLatestPosts() {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch();
      PostSource.fetchLatestPosts()
        .then((posts) => {
          this.updateLatestPosts(posts);
        })
        .catch((error) => {
          this.postsFailed(error);
        });
    };
  }

  fetchPost(postID) {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch(postID);
      PostSource.fetchPost(postID)
        .then((post) => {
          this.updatePost(post);
        })
        .catch((error) => {
          this.postsFailed(error);
        });
    };
  }

  fetchPreview(postID, thumbnailID) {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch(postID);
      PostSource.fetchPreview(postID, thumbnailID)
        .then((preview) => {
          this.updatePreview({
            postID,
            preview,
          });
        })
        .catch((error) => {
          this.postsFailed(error);
        });
    };
  }
}

export const AbstractPostActions = PostActions;

export default alt.createActions(PostActions);
