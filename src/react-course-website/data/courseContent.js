import lectures from './lecture-data.json';
import assignments from './assignment-data.json';
import tutorials from './tutorial-data.json';

const createIdedElement = (el, index) => ({ ...el, id: index });

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

export const reducer = (state, action) => {
  switch (action.type) {
    case addLecture:
      return {
        ...state,
        lectures: [].concat(state.lectures, {
          ...lectures[0],
          unit: action.newName,
          id: state.lectures.length,
        }),
      };
    case removeLecture:
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
      return {
        ...state,
        forums: state.forums.map(editSingle(action.id, forum => ({
          ...forum,
          topics: forum.topics.filter(topic => topic.id !== action.topicId).map(resetIds),
        }))),
      };
    case addForumTopicComment:
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
      throw new Error('Unknown action');
  }
};
