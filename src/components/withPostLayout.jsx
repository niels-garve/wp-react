import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import PostStore from '../stores/PostStore';
import PostActions from '../actions/PostActions';
import Header from './Header';
import Footer from './Footer';
import DefaultError from './DefaultError';
import Spinner from './Spinner';
import withPostRevisions from './withPostRevisions';

function withPostLayout(Post) {
  class PostLayout extends React.Component {
    componentDidMount() {
      if (this.props.preview) {
        PostActions.fetchRevisions.defer(this.props.id);
      } else {
        PostActions.fetchPost.defer(this.props.id);
      }
    }

    render() {
      if (this.props.error) {
        return (
          <DefaultError
            title="We’re sorry!"
            text="We could not load this post."
            error={this.props.error}
          />
        );
      }

      let post = PostStore.getPost(this.props.id);

      if (this.props.preview) {
        post = PostStore.getPostPreview(this.props.id);
      }

      if (post === null || post.isLoading) {
        return <Spinner layoutModifier="app" />;
      }

      return (
        <div>
          {post.yoast_meta &&
          <Helmet>
            <title>{post.yoast_meta.yoast_wpseo_title}</title>
            <meta name="description" content={post.yoast_meta.yoast_wpseo_metadesc} />
            <meta property="og:title" content={post.yoast_meta.yoast_wpseo_title} />
            <meta property="og:description" content={post.yoast_meta.yoast_wpseo_metadesc} />
            <link rel="canonical" href={post.yoast_meta.yoast_wpseo_canonical} />
            <meta property="og:url" content={post.yoast_meta.yoast_wpseo_canonical} />
          </Helmet>
          }
          {post.acf.header ?
            <Header id={post.acf.header.ID} />
            :
            <Header />
          }
          <main className="l-container l-main">
            <article className="l-main__content">
              <Post
                post={post}
                {...this.props}
              />
            </article>
          </main>
          {post.acf.footer &&
          <Footer id={post.acf.footer.ID} />
          }
        </div>
      );
    }
  }

  PostLayout.propTypes = {
    id: PropTypes.number.isRequired,
    preview: PropTypes.bool.isRequired,
    error: PropTypes.shape({}),
  };

  PostLayout.defaultProps = {
    error: null,
  };

  return withPostRevisions(PostLayout);
}

export default withPostLayout;
