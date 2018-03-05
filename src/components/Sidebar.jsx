import React from 'react';
import PropTypes from 'prop-types';
import AltContainer from 'alt-container';

import SidebarStore from '../stores/SidebarStore';
import PostStore from '../stores/PostStore';
import CategoryNavigation from './CategoryNavigation';

/**
 * If you have a single component and you’re using required propTypes then this is a legitimate
 * way of rendering the components without getting a warning about invalid propTypes from React
 * due to cloneWithProps.
 * @returns {XML}
 * @see http://alt.js.org/docs/components/altContainer/
 */
const Sidebar = (props) => {
  const sidebar = SidebarStore.getSidebar(props.id);

  return (
    <aside className="l-main__side-content">
      {sidebar && 'Sidebar'}
      <AltContainer store={PostStore} component={CategoryNavigation} />
    </aside>
  );
};

Sidebar.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Sidebar;
