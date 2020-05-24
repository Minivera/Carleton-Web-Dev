import React from 'react';

import { CollapsibleContent } from './collapsibleContent';
import { Tutorial } from './tutorial';

export const Tutorials = ({ tutorials, user, dispatch }) => (
  <CollapsibleContent title="Tutorials">
    {tutorials.map(tutorial => (
      <Tutorial key={tutorial.id} tutorial={tutorial} user={user} dispatch={dispatch} />
    ))}
  </CollapsibleContent>
);
