import React from 'react';

import { CollapsibleContent } from './collapsibleContent';
import { Lecture } from './lecture';

export const Lectures = ({ lectures, user, dispatch }) => (
  <CollapsibleContent title="Lectures">
    {lectures.map(lecture => (
      <Lecture key={lecture.id} lecture={lecture} user={user} dispatch={dispatch} />
    ))}
  </CollapsibleContent>
);
