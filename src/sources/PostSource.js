import _ from 'lodash';
import wp from './wp';

class PostSource {
  static fetch(page) {
    return wp.categories().slug('allgemein')
      .then((categories) => {
        // .slug() queries will always return as an array
        const category = categories[0];
        return wp
          .posts()
          .categories(category.id)
          .param('orderby', 'date')
          .param('order', 'desc')
          .perPage(10)
          .page(page);
      });
  }

  static fetchPost(postID) {
    return wp
      .posts()
      .id(postID)
      .then(post => (
        Promise.all(post.categories.map(categoryID => wp.categories().id(categoryID)))
          .then((categories) => {
            const c = _.map(categories, category => category.slug);
            const p = post;
            p.categories_slugs = c;
            return p;
          })
      ));
  }

  static fetchRevisions(postID) {
    return wp
      .posts()
      .id(postID)
      .revisions();
  }
}

export default PostSource;
