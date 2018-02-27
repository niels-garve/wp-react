import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import connectToStores from 'alt-utils/lib/connectToStores';
import _ from 'lodash';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

import PageStore from '../stores/PageStore';
import Spinner from './Spinner';
import withPageRevisions from './withPageRevisions';

function withPageLayout(Page) {
  class PageLayout extends React.Component {
    static getStores() {
      return [PageStore];
    }

    static getPropsFromStores() {
      return PageStore.getState();
    }

    render() {
      let page = null;

      if (this.props.revisionID === -1) {
        page = PageStore.getPageBySlug(this.props.slug);
      } else {
        page = PageStore.getPagePreview(this.props.revisionID);
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
          {page.acf.header ?
            <Header id={page.acf.header.ID} />
            :
            <Header />
          }
          {page.acf.sidebar ?
            <main className="l-container l-main">
              <article className="l-main__content">
                <Page
                  page={page}
                  {...this.props}
                />
              </article>
              <Sidebar id={page.acf.sidebar.ID} />
            </main>
            :
            <main className="l-container">
              <article>
                <Page
                  page={page}
                  {...this.props}
                />
              </article>
            </main>
          }
          {page.acf.footer &&
          <Footer id={page.acf.footer.ID} />
          }
        </div>
      );
    }
  }

  PageLayout.propTypes = {
    slug: PropTypes.string.isRequired,
    revisionID: PropTypes.number.isRequired,
  };

  // @see https://reactjs.org/docs/higher-order-components.html
  return _.flowRight([withPageRevisions, connectToStores])(PageLayout);
}

export default withPageLayout;
