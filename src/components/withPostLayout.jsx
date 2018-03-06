import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import connectToStores from 'alt-utils/lib/connectToStores';

import PostStore from '../stores/PostStore';
import PageStore from '../stores/PageStore';
import SiteStore from '../stores/SiteStore';
import HeaderStore from '../stores/HeaderStore';
import PostActions from '../actions/PostActions';
import Header from './Header';
import Footer from './Footer';
import DefaultError from './DefaultError';
import Spinner from './Spinner';

function withPostLayout(Post) {
  class PostLayout extends React.Component {
    static getStores() {
      return [PageStore, SiteStore, PostStore];
    }

    static getPropsFromStores() {
      return {
        pages: PageStore.getState().pages,
        siteObj: SiteStore.getState().siteObj,
        ...PostStore.getState(),
      };
    }

    componentDidMount() {
      if (this.props.preview) {
        PostActions.fetchRevisions.defer(this.props.id, this.props.thumbnailID);
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

      const header = post.acf.header ? HeaderStore.getHeader(post.acf.header.ID) : null;

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
          <Header header={header} pages={this.props.pages} title={this.props.siteObj.name} />
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
    thumbnailID: PropTypes.number,
    error: PropTypes.shape({}),
    pages: PropTypes.arrayOf(PropTypes.object).isRequired,
    siteObj: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  };

  PostLayout.defaultProps = {
    thumbnailID: -1,
    error: null,
  };

  return connectToStores(PostLayout);
}

export default withPostLayout;
