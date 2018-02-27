import React from 'react';
import PropTypes from 'prop-types';
import DefaultError from './DefaultError';
import Spinner from './Spinner';
import FooterActions from '../actions/FooterActions';
import FooterStore from '../stores/FooterStore';
import withFooterRevisions from './withFooterRevisions';

class Footer extends React.Component {

  componentDidMount() {
    if (this.props.revisionID === -1) {
      FooterActions.fetchFooter.defer(this.props.id);
    } else {
      FooterActions.fetchRevisions.defer(this.props.revisionID);
    }
  }

  buildFooter() {
    if (this.props.error !== null) {
      return (
        <DefaultError
          text="Sorry, we could not load the footer."
          error={this.props.error}
        />
      );
    }

    let footer = null;

    if (this.props.revisionID === -1) {
      footer = FooterStore.getFooter(this.props.id);
    } else {
      footer = FooterStore.getFooterPreview(this.props.revisionID);
    }

    if (footer === null || footer.isLoading) {
      return <Spinner />;
    }

    // TODO adjust to your needs
    return false;
  }

  render() {
    return (
      <footer className="footer">
        <div className="l-container">
          {this.buildFooter()}
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  id: PropTypes.number.isRequired,
  revisionID: PropTypes.number.isRequired,
  error: PropTypes.shape({}),
};

Footer.defaultProps = {
  error: null,
};

export default withFooterRevisions(Footer);
