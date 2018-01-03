import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import RichText from './RichText';

import PageStore from '../stores/PageStore';
import Spinner from './Spinner';
import withPageRevisions from './withPageRevisions';

const PageLayout = (props) => {
  let page = null;

  if (props.revisionID === -1) {
    page = PageStore.getPageBySlug(props.slug);
  } else {
    page = PageStore.getPagePreview(props.revisionID);
  }

  if (page === null) {
    return <Spinner layoutModifier="app" />;
  }

  return (
    <div>
      {page.yoast_meta &&
      <Helmet>
        <title>{page.yoast_meta.yoast_wpseo_title}</title>
        <meta name="description" content={page.yoast_meta.yoast_wpseo_metadesc} />
        <meta property="og:title" content={page.yoast_meta.yoast_wpseo_title} />
        <meta property="og:description" content={page.yoast_meta.yoast_wpseo_metadesc} />
        <link rel="canonical" href={page.yoast_meta.yoast_wpseo_canonical} />
        <meta property="og:url" content={page.yoast_meta.yoast_wpseo_canonical} />
      </Helmet>
      }
      <Header id={page.acf.header.ID} />
      {page.acf.sidebar ?
        <main className="l-container l-main">
          <article className="l-main__content">
            <RichText html={page.content.rendered} />
          </article>
          <Sidebar id={page.acf.sidebar.ID} />
        </main>
        :
        <main className="l-container">
          <article>
            <RichText html={page.content.rendered} />
          </article>
        </main>
      }
      <Footer id={page.acf.footer.ID} />
    </div>
  );
};

PageLayout.propTypes = {
  slug: PropTypes.string.isRequired,
  revisionID: PropTypes.number.isRequired,
};

export default withPageRevisions(PageLayout);
