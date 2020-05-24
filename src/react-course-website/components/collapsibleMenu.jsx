import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

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
