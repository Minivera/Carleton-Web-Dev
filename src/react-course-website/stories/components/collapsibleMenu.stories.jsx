import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { CollapsibleMenu } from '../../components/collapsibleMenu';

export default {
  title: 'Components/Collapsible Menu',
  component: CollapsibleMenu,
  decorators: [withKnobs]
};

export const collapsibleMenu = () => (
  <aside className="menu">
    <p className="menu-label">
      This bulma menu contains collapsible menus
    </p>
    <ul className="menu-list">
      <CollapsibleMenu title={text('Title', 'Default title')} >
        This content can be collapsed!
      </CollapsibleMenu>
    </ul>
  </aside>
);
