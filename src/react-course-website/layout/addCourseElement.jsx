import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { addLecture, addTutorial, addAssignment } from '../data/courseContent';

export const AddCourseElement = ({ content, dispatch }) => {
  const { type } = useParams();
  const history = useHistory();
  const [newElement, setNewElement] = useState('');

  let singularType = '';
  let actionType = '';
  let newId = 0;
  switch (type) {
    case 'lectures': {
      singularType = 'lecture';
      actionType = addLecture;
      newId = content.lectures.length;
      break;
    }
    case 'tutorials': {
      singularType = 'tutorial';
      actionType = addTutorial;
      newId = content.tutorials.length;
      break;
    }
    case 'assignments': {
      singularType = 'assignment';
      actionType = addAssignment;
      newId = content.assignments.length;
      break;
    }
  }

  const handleSubmit = () => {
    dispatch({
      type: actionType,
      newName: newElement,
    });
    history.replace(`/${type}/${newId}`);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content">
        <div className="box">
          <div className="field">
            <label className="label">What is the name of your new {singularType}?</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder={`Name of the ${singularType}`}
                value={newElement}
                onChange={(event => setNewElement(event.target.value))}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>Submit</button>
            </div>
            <div className="control">
              <button className="button is-link is-light" onClick={() => history.goBack()}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={() => history.goBack()} />
    </div>
  );
};
