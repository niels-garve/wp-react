import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import RichText from './RichText';
import withPostLayout from './PostLayout';

const DefaultPost = props => (
  <section>
    <h2>
      {props.post.title.rendered}
    </h2>
    <span>{moment(props.post.modified).format('YYYY/MM/DD')}</span>
    <RichText html={props.post.content.rendered} />
  </section>
);

DefaultPost.propTypes = {
  post: PropTypes.shape({
    modified: PropTypes.string.isRequired,
    title: PropTypes.shape({
      rendered: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.shape({
      rendered: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withPostLayout(DefaultPost);
