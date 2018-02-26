/* eslint-disable class-methods-use-this, no-underscore-dangle */
import alt from '../alt';
import PostSource from '../sources/PostSource';

class PostActions {

  constructor(category) {
    this.category = category || 'uncategorized';
  }

  fetchPosts(page = 1) {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch(page);
      PostSource.fetch(this.category, page)
        .then((posts) => {
          this.updatePosts(page, posts, posts._paging);
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

  fetchRevisions(postID) {
    return (dispatch) => {
      // we dispatch an event here so we can have `loading` state.
      dispatch(postID);
      PostSource.fetchRevisions(postID)
        .then((revisions) => {
          this.updateRevisions(postID, revisions);
        })
        .catch((error) => {
          this.postsFailed(error);
        });
    };
  }

  /**
   * can't be static due to altjs
   * @param error
   * @returns {Error}
   */
  postsFailed(error) {
    return error;
  }

  /**
   * can't be static due to altjs
   * @param page
   * @param posts
   * @param paging
   * @returns {{page: *, posts: *, paging: *}}
   */
  updatePosts(page, posts, paging) {
    return {
      page,
      posts,
      paging,
    };
  }

  /**
   * can't be static due to altjs
   * @param posts
   * @returns {[{}, {}]} post collection
   */
  updatePostsByCategories(posts) {
    return posts;
  }

  /**
   * can't be static due to altjs
   * @param posts
   * @returns {[{}, {}]} post collection
   */
  updateLatestPosts(posts) {
    return posts;
  }

  /**
   * can't be static due to altjs
   * @param post
   * @returns {*}
   */
  updatePost(post) {
    return post;
  }

  /**
   * can't be static due to altjs
   * @param postID
   * @param revisions
   * @returns {{postID: *, revisions: *}}
   */
  updateRevisions(postID, revisions) {
    return {
      postID,
      revisions,
    };
  }
}

export const AbstractPostActions = PostActions;

export default alt.createActions(PostActions);
