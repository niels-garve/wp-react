import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import connectToStores from 'alt-utils/lib/connectToStores';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import OfflinePluginRuntime from 'offline-plugin/runtime';

// TODO import fonts from './fonts/xxx.scss';
// eslint-disable-next-line no-unused-vars
import styles from './app.scss';

import Spinner from './components/Spinner';
import DefaultError from './components/DefaultError';

import PageStore from './stores/PageStore';
import SiteStore from './stores/SiteStore';
import Home from './components/Home';
import DefaultPage from './components/DefaultPage';
import DefaultPost from './components/DefaultPost';

const TEMPLATES = {
  // TODO adjust to your needs
  home: Home,
};

class App extends React.Component {

  static getStores() {
    return [PageStore, SiteStore];
  }

  static getPropsFromStores() {
    return {
      Pages: PageStore.getState(),
      Site: SiteStore.getState(),
    };
  }

  componentDidMount() {
    PageStore.fetchPages();
    SiteStore.fetchSite();
  }

  buildRoutes() {
    return this.props.Pages.pages.map(page => (
      <Route
        key={page.id}
        path={`/${page.slug}`}
        exact
        render={(props) => {
          const params = queryString.parse(props.location.search);
          const Component = TEMPLATES[page.slug] || DefaultPage;

          // not in preview mode
          if (params.preview !== 'true') {
            return <Component id={page.id} preview={false} />;
          }

          const previewID = parseInt(params.preview_id, 10);

          // page preview
          if (!isNaN(previewID)) {
            return <Component id={previewID} preview />;
          }

          return (
            <DefaultError
              title="Page not found"
              text="Sorry, but the page you were trying to view does not exist."
            />
          );
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
    const redirectSlug = this.props.Pages.pages[0].slug;

    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                const params = queryString.parse(props.location.search);

                // not in draft preview mode
                if (params.preview !== 'true') {
                  return <Redirect exact from="/" to={`/${redirectSlug}`} />;
                }

                const postID = parseInt(params.p, 10);
                const pageID = parseInt(params.page_id, 10);

                // post draft preview
                if (!isNaN(postID)) {
                  return <DefaultPost id={postID} preview />;
                }

                // page draft preview
                if (!isNaN(pageID)) {
                  return <DefaultPage id={pageID} preview />;
                }

                return (
                  <DefaultError
                    title="Page not found"
                    text="Sorry, but the page you were trying to view does not exist."
                  />
                );
              }}
            />

            {this.buildRoutes()}

            <Route
              exact
              path="/archives/:id/:slug?"
              render={(props) => {
                const id = parseInt(props.match.params.id, 10);
                const params = queryString.parse(props.location.search);

                // not in preview mode
                if (params.preview !== 'true') {
                  return <DefaultPost id={id} preview={false} />;
                }

                const previewID = parseInt(params.preview_id, 10);

                function getThumbnailID() {
                  // eslint-disable-next-line no-underscore-dangle
                  const thumbnailID = parseInt(params._thumbnail_id, 10);

                  return isNaN(thumbnailID) ? -1 : thumbnailID;
                }

                // post preview
                if (!isNaN(previewID)) {
                  return <DefaultPost id={previewID} preview thumbnailID={getThumbnailID()} />;
                }

                return (
                  <DefaultError
                    title="Page not found"
                    text="Sorry, but the page you were trying to view does not exist."
                  />
                );
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

const AppContainer = connectToStores(App);

OfflinePluginRuntime.install();

ReactDOM.render(
  <AppContainer />,
  document.getElementById('app'),
);
