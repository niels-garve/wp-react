import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import HeaderActions from '../actions/HeaderActions';
import HeaderStore from '../stores/HeaderStore';
import Spinner from './Spinner';
import DefaultError from './DefaultError';
import withHeaderRevisions from './withHeaderRevisions';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openMenu: false,
    };
  }

  componentDidMount() {
    if (this.props.revisionID !== -1) {
      HeaderActions.fetchRevisions.defer(this.props.revisionID);
    } else if (this.props.id !== -1) {
      HeaderActions.fetchHeader.defer(this.props.id);
    }
  }

  buildHeader() {
    if (this.props.id === -1 && this.props.revisionID === -1) {
      return false;
    }

    if (this.props.error !== null) {
      return (
        <DefaultError
          text="Sorry, we could not load the header."
          error={this.props.error}
        />
      );
    }

    let header = null;

    if (this.props.revisionID === -1) {
      header = HeaderStore.getHeader(this.props.id);
    } else {
      header = HeaderStore.getHeaderPreview(this.props.revisionID);
    }

    if (header === null || header.isLoading) {
      return <Spinner />;
    }

    // TODO adjust to your needs
    return false;
  }

  render() {
    return (
      <header className="header">
        <div className="header__container l-container">
          <div className="header__toolbar">
            <a className="header__brand" href="/">{this.props.title}</a>
            <button
              className="header__menu-button"
              onClick={() => this.setState({ openMenu: !this.state.openMenu })}
            >
              <span className="header__sr-only">Toggle navigation</span>
              <span className="header__menu-button-bar" />
              <span className="header__menu-button-bar" />
              <span className="header__menu-button-bar" />
            </button>
          </div>
          <nav className={`header__menu${this.state.openMenu ? ' is-expanded' : ''}`}>
            <ul className="header__menu-items">
              {this.props.pages.map(page => (
                <li className="header__menu-item" key={page.id}>
                  <NavLink className="header__menu-link" exact to={`/${page.slug}`}>{page.title.rendered}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__content">
            {this.buildHeader()}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  id: PropTypes.number,
  revisionID: PropTypes.number.isRequired,
  pages: PropTypes.arrayOf(PropTypes.object).isRequired, // page collection
  title: PropTypes.string.isRequired,
  error: PropTypes.shape({}),
};

Header.defaultProps = {
  id: -1,
  error: null,
};

export default withHeaderRevisions(Header);
