import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';

import { addLecture, addTutorial, addAssignment } from '../data/courseContent';
import { CourseContentType } from '../types/proptypes';

/**
 * Generic page for adding a new course element, hosted under the route `/:type/+`.
 *
 * The _:type_ parameter in the route should be one of `lecture|tutorials|assignments` and will decide which
 * element is to be added.
 *
 * The component displays the list of elements based on the type as well as a Bulma modal.
 *
 * See also: [Bulma Modal](https://bulma.io/documentation/components/modal/).
 */
export const AddCourseElement = ({ content, dispatch }) => {
  const { type } = useParams();
  const history = useHistory();
  const [newElement, setNewElement] = useState('');

  let singularType = '';
  let actionType = '';
  let newId = 0;
  // Select which type to display
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

AddCourseElement.propTypes = {
  /**
   * The course content inside the application.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  content: CourseContentType.isRequired,

  /**
   * The dispatch function to send events to the state machine.
   *
   * See the course content documentation for more details.
   */
  dispatch: PropTypes.func.isRequired,
};
