import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import moment from 'moment';
import PostStore from '../stores/PostStore';
import PostActions from '../actions/PostActions';
import Header from './Header';
import Footer from './Footer';
import RichText from './RichText';
import DefaultError from './DefaultError';
import Spinner from './Spinner';
import withPostRevisions from './withPostRevisions';

class PostLayout extends React.Component {

  componentDidMount() {
    if (this.props.revisionID === -1) {
      PostActions.fetchPost.defer(this.props.id);
    } else {
      PostActions.fetchRevisions.defer(this.props.revisionID);
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

    let post = null;

    if (this.props.revisionID === -1) {
      post = PostStore.getPost(this.props.id);
    } else {
      post = PostStore.getPostPreview(this.props.revisionID);
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
        <Header id={post.acf.header.ID} />
        <main className="l-container l-main">
          <article className="l-main__content">
            <section className="post">
              <span>{moment(post.modified).format('YYYY/MM/DD')}</span>
              <h2>
                {post.title.rendered}
              </h2>
              <RichText html={post.content.rendered} />
            </section>
          </article>
        </main>
        <Footer id={post.acf.footer.ID} />
      </div>
    );
  }
}

PostLayout.propTypes = {
  id: PropTypes.number.isRequired,
  revisionID: PropTypes.number.isRequired,
  error: PropTypes.shape({}),
};

PostLayout.defaultProps = {
  error: null,
};

export default withPostRevisions(PostLayout);
