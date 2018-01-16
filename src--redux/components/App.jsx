import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import PropTypes from 'prop-types';

injectGlobal`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    background-color: #fff;
    color: #000;
    font-family: 'Gill Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.45;
    margin: 0;
  }
`;

const Jumbotron = styled.section`
  background: darkslateblue;
  color: #fff;
  padding: 4em;
`;

class App extends React.Component {

  componentDidMount() {
    this.props.onInit();
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>WordPress React rewritten in Redux and Styled Components</h1>
          <h3>Pages:</h3>
          <ul>
            {this.props.pages.map(page => <li key={page.id}>{page.slug}</li>)}
          </ul>
        </Jumbotron>
      </div>
    );
  }
}

App.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInit: PropTypes.func.isRequired,
};

export default App;
