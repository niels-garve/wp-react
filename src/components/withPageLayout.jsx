import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import connectToStores from 'alt-utils/lib/connectToStores';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

import PageStore from '../stores/PageStore';
import Spinner from './Spinner';

function withPageLayout(Page) {
  class PageLayout extends React.Component {
    static getStores() {
      return [PageStore];
    }

    static getPropsFromStores() {
      return PageStore.getState();
    }

    componentDidMount() {
      if (this.props.preview) {
        PageStore.fetchPageRevisions(this.props.id);
      }
    }

    render() {
      let page = PageStore.getPage(this.props.id);

      if (this.props.preview) {
        page = PageStore.getPagePreview(this.props.id);
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
    id: PropTypes.number.isRequired,
    preview: PropTypes.bool.isRequired,
  };

  return connectToStores(PageLayout);
}

export default withPageLayout;
