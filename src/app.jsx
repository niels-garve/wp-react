import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import AltContainer from 'alt-container';
import OfflinePluginRuntime from 'offline-plugin/runtime';

/* eslint-disable no-unused-vars */
// TODO import fonts from './fonts/xxx.scss';
import styles from './app.scss';
/* eslint-enable no-unused-vars */

import PageLayout from './components/PageLayout';
import PostLayout from './components/PostLayout';
import Spinner from './components/Spinner';
import DefaultError from './components/DefaultError';

import PageActions from './actions/PageActions';
import PageStore from './stores/PageStore';
import SiteActions from './actions/SiteActions';
import SiteStore from './stores/SiteStore';

const TEMPLATES = {
  // TODO adjust to your needs
  // 'sample-page': PageLayout,
};

class App extends React.Component {

  componentDidMount() {
    PageActions.fetchPages();
    SiteActions.fetchSite();
  }

  buildRoutes() {
    return this.props.Pages.pages.map(page => (
      <Route
        key={page.id}
        path={`/${page.slug}`}
        exact
        render={() => {
          const Component = TEMPLATES[page.slug] || PageLayout;
          return <Component slug={page.slug} />;
        }}
      />
    ));
  }

  render() {
    if (this.props.Pages.error !== null || this.props.Site.error !== null) {
      const error = this.props.Pages.error || this.props.Site.error;

      return <DefaultError title="We’re sorry!" text="Something went wrong." error={error} />;
    }

    if (this.props.Pages.pages.length === 0 || this.props.Site.siteObj === null) {
      return <Spinner layoutModifier="app" />;
    }

    // redirect to first page (this.props.Pages.pages are sorted by menu_order)
    const redirectURL = `/${this.props.Pages.pages[0].slug}`;

    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                const params = queryString.parse(props.location.search);

                if (params.preview !== 'true') {
                  return <Redirect exact from="/" to={redirectURL} />;
                }

                const postID = parseInt(params.p, 10);
                const pageID = parseInt(params.page_id, 10);

                // post draft preview
                if (!isNaN(postID)) {
                  switch (params.post_type) {
                    case 'headers':
                    case 'sidebars':
                    case 'footers':
                      return <PageLayout slug={redirectURL} />;
                    default:
                      return <PostLayout id={postID} />;
                  }
                }

                // page draft preview
                if (!isNaN(pageID)) {
                  // slug can be an empty string - the page is loaded by pageID (preview mode)
                  return <PageLayout slug="" />;
                }

                // fallback
                return <Redirect exact from="/" to={redirectURL} />;
              }}
            />

            {this.buildRoutes()}

            <Route
              exact
              path="/archives/:id/:slug?"
              render={(props) => {
                const id = parseInt(props.match.params.id, 10);

                switch (props.match.params.id) {
                  case 'headers':
                  case 'sidebars':
                  case 'footers':
                    return <PageLayout slug={redirectURL} />;
                  default:
                    return <PostLayout id={id} />;
                }
              }}
            />

            <Route render={() => (
              <DefaultError
                title="Page not found"
                text="Sorry, but the page you were trying to view does not exist."
              />)}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  Pages: PropTypes.shape({
    pages: PropTypes.arrayOf(PropTypes.object), // page collection
    error: PropTypes.object,
  }),
  Site: PropTypes.shape({
    siteObj: PropTypes.object,
    error: PropTypes.object,
  }),
};

// since they're not required
App.defaultProps = {
  Pages: {
    pages: [],
    error: null,
  },
  Site: {
    siteObj: null,
    error: null,
  },
};

OfflinePluginRuntime.install();

ReactDOM.render(
  <AltContainer stores={{ Pages: PageStore, Site: SiteStore }}>
    <App />
  </AltContainer>,
  document.getElementById('app'),
);
