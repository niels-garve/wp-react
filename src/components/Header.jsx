import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import RichText from './RichText';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: false,
    };
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
          {this.props.header &&
          <div className="header__content">
            <RichText html={this.props.header.content.rendered} />
          </div>
          }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  header: PropTypes.shape({
    content: PropTypes.shape({
      rendered: PropTypes.string,
    }),
  }),
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  header: null,
};

export default Header;
