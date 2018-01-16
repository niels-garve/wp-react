import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {

  componentDidMount() {
    this.props.onInit();
  }

  render() {
    return (
      <div>
        <h1>App</h1>
        <h3>Pages:</h3>
        <ul>
          {this.props.pages.map(page => <li key={page.id}>{page.slug}</li>)}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInit: PropTypes.func.isRequired,
};

export default App;
