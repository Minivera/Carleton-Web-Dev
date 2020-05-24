import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

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
