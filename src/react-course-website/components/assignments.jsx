import React from 'react';

import { CollapsibleContent } from './collapsibleContent';
import { Assignment } from './assignment';

export const Assignments = ({ assignments, user, dispatch }) => (
  <CollapsibleContent title="Assignments">
    {assignments.map(assignment => (
      <Assignment key={assignment.id} assignment={assignment} user={user} dispatch={dispatch} />
    ))}
  </CollapsibleContent>
);
