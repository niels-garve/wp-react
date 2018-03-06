import _ from 'lodash';
import wp from './wp';

class PostSource {
  static fetch(categorySlug, page) {
    return wp.categories().slug(categorySlug)
      .then((categories) => {
        // .slug() queries will always return as an array
        const category = categories[0];
        return wp
          .posts()
          .categories(category.id)
          .embed()
          .param('orderby', 'date')
          .param('order', 'desc')
          .perPage(10)
          .page(page);
      });
  }

  static fetchPostsByCategories() {
    return wp.categories().then(categories => (
      wp.posts()
        .param('orderby', 'date')
        .param('order', 'desc')
        .then(posts => (_(categories)
            .map((category) => {
              const categoryPosts =
                _.filter(posts, post => post.categories.indexOf(category.id) !== -1);

              if (categoryPosts.length === 0) {
                return false;
              }

              return {
                ...category,
                posts: categoryPosts,
              };
            })
            .compact()
            .value()
        ))
    ));
  }

  static fetchLatestPosts() {
    return wp
      .posts()
      .embed()
      .param('orderby', 'date')
      .param('order', 'desc')
      .perPage(10)
      .page(1);
  }

  static fetchPost(postID) {
    return wp
      .posts()
      .id(postID)
      .embed()
      .then(post => (
        Promise.all(post.categories.map(categoryID => wp.categories().id(categoryID)))
          .then((categories) => {
            const p = post;
            p.categories_objects = categories;
            return p;
          })
      ));
  }

  static fetchRevisions(postID, thumbnailID) {
    const requests = [
      wp
        .posts()
        .id(postID)
        .revisions(),
    ];

    if (thumbnailID !== -1) {
      requests.push(
        wp
          .media()
          .id(thumbnailID),
      );
    }

    return Promise.all(requests)
      .then((data) => {
        const revisions = data[0];

        if (data.length >= 2) {
          revisions[0] = {
            ...revisions[0],
            _embedded: {
              'wp:featuredmedia': [data[1]],
            },
          };
        }

        return revisions;
      });
  }
}

export default PostSource;
