import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import RichText from './RichText';
import withPostLayout from './withPostLayout';

const DefaultPost = props => (
  <section>
    {/* TODO implement responsive image */}
    {/* eslint-disable no-underscore-dangle */}
    <img
      src={props.post._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url}
      alt={props.post._embedded['wp:featuredmedia'][0].alt_text}
    />
    {/* eslint-enable no-underscore-dangle */}
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
    _embedded: PropTypes.shape({
      'wp:featuredmedia': PropTypes.array,
    }),
  }).isRequired,
};

export default withPostLayout(DefaultPost);
