import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

/**
 * A collapsible container to hide content on demand. When rendered, it will create a level bulma element
 * with the title on the left and a button on the right to hide or show the children. The children are visible
 * by default.
 *
 * See also: [Bulma Level](https://bulma.io/documentation/layout/level/).
 */
export const CollapsibleContent = ({ title, children }) => {
  const [opened, setOpened] = useState(true);

  return (
    <div>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <h3 className="title is-4">{title}</h3>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <span className="icon is-medium" style={{ cursor: 'pointer' }} onClick={() => setOpened(!opened)}>
              <FontAwesomeIcon icon={opened ? faChevronUp : faChevronDown} size="sm" />
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div style={{
        transition: opened ? 'max-height 1s ease-in-out' : 'max-height 0.5s cubic-bezier(0, 1, 0, 1)',
        maxHeight: opened ? 9000 : 0,
        overflowY: 'hidden',
        paddingBottom: opened ? 20 : 0,
        marginLeft: -20,
        paddingLeft: 20,
        marginRight: -20,
        paddingRight: 20,
      }}>
        {children}
      </div>
    </div>
  );
};

CollapsibleContent.propTypes = {
  /**
   * The title so display for this container.
   */
  title: PropTypes.node.isRequired,

  /**
   * The children to render inside of the collapsible content.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
