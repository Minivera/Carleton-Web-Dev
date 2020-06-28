export const createUrl = (type, ...rest) => {
  switch (type) {
    case 'home': {
      return '/wc-course-website/index.html';
    }
    case 'lectures': {
      return '/wc-course-website/pages/lectures/index.html';
    }
    case 'lecture': {
      const [lectureId] = rest;
      return `/wc-course-website/pages/lecture/index.html?lecture=${lectureId}`;
    }
    case 'tutorials': {
      return '/wc-course-website/pages/tutorials/index.html';
    }
    case 'tutorial': {
      const [tutorialId] = rest;
      return `/wc-course-website/pages/tutorial/index.html?tutorial=${tutorialId}`;
    }
    case 'assignments': {
      return '/wc-course-website/pages/assignments/index.html';
    }
    case 'assignment': {
      const [assignmentId] = rest;
      return `/wc-course-website/pages/assignment/index.html?assignment=${assignmentId}`;
    }
    case 'forums': {
      return '/wc-course-website/pages/forums/index.html';
    }
    case 'forum': {
      const [forumId] = rest;
      return `/wc-course-website/pages/forum/index.html?forum=${forumId}`;
    }
    case 'topic': {
      const [forumId, topicId] = rest;
      return `/wc-course-website/pages/forum/topic/index.html?forum=${forumId}&topic=${topicId}`;
    }
    default:
      throw new Error(`Unknown type ${type} given to the createUrl helper.`);
  }
};
