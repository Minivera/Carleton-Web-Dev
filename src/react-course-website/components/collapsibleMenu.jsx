import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

/**
 * A collapsible menu to be added inside of a bulma menu element.
 *
 * When used inside of a menu, this component will render a submenu that can be collapsed ot hide its elements. The
 * menu is collapsed by default.
 *
 * See also: [Bulma Menu](https://bulma.io/documentation/components/menu/).
 */
export const CollapsibleMenu = ({ title, children }) => {
  const [opened, setOpened] = useState(false);

  return (
    <li>
      <div className="is-flex">
        <span style={{ flex: 1 }}>
          {title}
        </span>
        <span className="icon is-medium" style={{ cursor: 'pointer' }} onClick={() => setOpened(!opened)}>
          <FontAwesomeIcon icon={opened ? faChevronUp : faChevronDown} size="sm" />
        </span>
      </div>
      <ul
        style={{
          transition: opened ? 'max-height 1s ease-in-out' : 'max-height 0.5s cubic-bezier(0, 1, 0, 1)',
          maxHeight: opened ? 9000 : 0,
          overflowY: 'hidden',
        }}
      >
        {children}
      </ul>
    </li>
  );
};

CollapsibleMenu.propTypes = {
  /**
   * The title so display for this menu element.
   */
  title: PropTypes.node.isRequired,

  /**
   * The children to render inside of the collapsible menu.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
