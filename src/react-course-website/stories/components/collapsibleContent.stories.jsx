import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { CollapsibleContent } from '../../components/collapsibleContent';

export default {
  title: 'Components/Collapsible content',
  component: CollapsibleContent,
  decorators: [withKnobs]
};

export const collapsibleContent = () => (
  <div className="content">
    <CollapsibleContent title={text('Title', 'Default title')} >
      This content can be collapsed!
    </CollapsibleContent>
  </div>
);
