import _ from 'lodash';

export default class AbstractPostStore {
  constructor() {
    this.posts = [];
    this.postsByCategories = [];
    this.postsRevisions = [];
    this.latestPosts = [];
    this.error = null;
    this.paging = null;

    this.exportPublicMethods({
      getPost: this.getPost,
      getPostPreview: this.getPostPreview,
    });
  }

  onFetchPosts(page) {
    // reset the array while we're fetching new posts so React can
    // be smart and render a spinner for us since the data is empty.
    this.posts[page] = [];
  }

  onFetchPostsByCategories() {
    this.postsByCategories = [];
  }

  onFetchLatestPosts() {
    this.latestPosts = [];
  }

  onFetchPost(postID) {
    const postsLength = this.posts.length;

    for (let page = 0; page < postsLength; page += 1) {
      const index = _.findIndex(this.posts[page], post => post.id === postID);

      if (index !== -1) {
        this.posts[page][index].isLoading = true;
        return;
      }
    } // else: push new page

    this.posts.push([{
      id: postID,
      isLoading: true,
    }]);
  }

  onFetchRevisions(postID) {
    const index = _.findIndex(this.postsRevisions, obj => obj.id === postID);

    if (index === -1) {
      this.postsRevisions.push({
        id: postID,
        revisions: [],
      });
    } else {
      this.postsRevisions[index].revisions = [];
    }
  }

  onPostsFailed(error) {
    this.error = error;
  }

  onUpdatePosts(data) {
    const {
      page,
      posts,
      paging,
    } = data;

    this.posts[page] = posts;
    this.paging = paging;
    this.error = null;
  }

  onUpdatePostsByCategories(posts) {
    this.postsByCategories = posts;
    this.error = null;
  }

  onUpdateLatestPosts(posts) {
    this.latestPosts = posts;
    this.error = null;
  }

  onUpdatePost(post) {
    const postsLength = this.posts.length;

    for (let page = 0; page < postsLength; page += 1) {
      let found = false;

      this.posts[page] = _.map(this.posts[page], (obj) => {
        if (obj.id === post.id) {
          found = true;
          return post;
        }

        return obj;
      });

      if (found) {
        break;
      }
    }

    this.error = null;
  }

  onUpdateRevisions(data) {
    const {
      postID,
      revisions,
    } = data;

    this.postsRevisions = _.map(this.postsRevisions, (obj) => {
      if (obj.id === postID) {
        return {
          ...obj,
          revisions,
        };
      }

      return obj;
    });

    this.error = null;
  }

  getPost(id) {
    const posts = this.getState().posts;
    const postsLength = posts.length;

    for (let page = 0; page < postsLength; page += 1) {
      const foundInPage = _.find(posts[page], post => post.id === id);
      if (foundInPage) {
        return foundInPage;
      }
    }

    return null;
  }

  getPostPreview(id) {
    const revisionsObj = _.find(this.getState().postsRevisions, obj => obj.id === id);

    if (revisionsObj && revisionsObj.revisions.length > 0) {
      return revisionsObj.revisions[0];
    }

    return null;
  }
}
