import lectures from './lecture-data.json';
import assignments from './assignment-data.json';
import tutorials from './tutorial-data.json';

// Adds IDs to our JSON elements based on the index.
const createIdedElement = (el, index) => ({ ...el, id: index });

// This will be the base state inside our application.
export const initialState = {
  lectures: lectures.map(createIdedElement),
  assignments: assignments.map(createIdedElement),
  tutorials: tutorials.map(createIdedElement),
  forums: [
    {
      id: 0,
      title: 'Announcements',
      topics: [],
    },
    {
      id: 1,
      title: 'General',
      topics: [],
    }
  ],
};

// This is all the actions we can send to our state machine for changing the state.
export const addLecture = 'ADD_LECTURE';
export const removeLecture = 'REMOVE_LECTURE';
export const addAssignment = 'ADD_ASSIGNMENT';
export const removeAssignment = 'REMOVE_ASSIGNMENT';
export const addTutorial = 'ADD_TUTORIAL';
export const removeTutorial = 'REMOVE_TUTORIAL';
export const addForumTopic = 'ADD_TOPIC';
export const removeForumTopic = 'REMOVE_TOPIC';
export const addForumTopicComment = 'ADD_TOPIC_COMMENT';
export const removeForumTopicComment = 'REMOVE_TOPIC_COMMENT';

// Edit a single element inside of a map. Will trigger the callback if the element's id is the same as the
// provided id.
const editSingle = (id, callback) => el => {
  if (el.id === id) {
    return callback(el);
  }
  return el;
};

// Since we rely on the length to create new ids, let's simplify our lives by resetting all ids
// to their index when we remove elements from lists.
const resetIds = (element, index) => ({
  ...element,
  id: index,
});

// A reducer is a special kind of state machine tha works using the reducer pattern.
// Essentially, the state machine will take the given state and a received action when the dispatch function is called
// and call the following function. The switch allows us to change the state based on that action's type and then return
// the changed state. No mutations happen, it's all immutable.
export const reducer = (state, action) => {
  switch (action.type) {
    case addLecture:
      // Add a lecture element when this action is called. It copies the content of the first lecture for now.
      return {
        ...state,
        lectures: [].concat(state.lectures, {
          ...lectures[0],
          unit: action.newName,
          id: state.lectures.length,
        }),
      };
    case removeLecture:
      // Removes the lecture using a filter and the provided id.
      return {
        ...state,
        lectures: state.lectures.filter(lecture => lecture.id !== action.id).map(resetIds),
      };
    case addAssignment:
      return {
        ...state,
        assignments: [].concat(state.assignments, {
          ...assignments[0],
          name: action.newName,
          id: state.assignments.length,
        }),
      };
    case removeAssignment:
      return {
        ...state,
        assignments: state.assignments.filter(assignment => assignment.id !== action.id).map(resetIds),
      };
    case addTutorial:
      return {
        ...state,
        tutorials: [].concat(state.tutorials, {
          ...tutorials[0],
          name: action.newName,
          id: state.tutorials.length,
        }),
      };
    case removeTutorial:
      return {
        ...state,
        tutorials: state.tutorials.filter(tutorial => tutorial.id !== action.id).map(resetIds),
      };
    case addForumTopic:
      // Adds a topic to one of the forum categories. The first comment will be created
      // using the passed description and username.
      return {
        ...state,
        forums: state.forums.map(editSingle(action.id, forum => ({
          ...forum,
          topics: [].concat(forum.topics, {
            id: forum.topics.length,
            title: action.title,
            comments: [
              {
                id: 0,
                user: action.username,
                content: action.description,
              }
            ],
          })
        }))),
      };
    case removeForumTopic:
      // Removes a forum topic using a filter.
      return {
        ...state,
        forums: state.forums.map(editSingle(action.id, forum => ({
          ...forum,
          topics: forum.topics.filter(topic => topic.id !== action.topicId).map(resetIds),
        }))),
      };
    case addForumTopicComment:
      // Adds a comment to a specific topic using the given ids, description and username.
      return {
        ...state,
        forums: state.forums.map(editSingle(action.id, forum => ({
          ...forum,
          topics: forum.topics.map(editSingle(action.topicId, topic => ({
            ...topic,
            comments: [].concat(topic.comments, {
              id: topic.comments.length,
              user: action.username,
              content: action.description,
            }),
          }))),
        }))),
      };
    case removeForumTopicComment:
      // Removes a comment from a specific topic using a filter.
      return {
        ...state,
        forums: state.forums.map(editSingle(action.id, forum => ({
          ...forum,
          topics: forum.topics.map(editSingle(action.topicId, topic => ({
            ...topic,
            comments: topic.comments.filter(comment => comment.id !== action.commentId).map(resetIds),
          }))),
        }))),
      };
    default:
      // If the action in unkown, we throw an error.
      throw new Error('Unknown action');
  }
};
