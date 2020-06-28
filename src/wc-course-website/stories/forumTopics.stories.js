import '../components/forumTopics';

export default {
  title: 'Forum topics',
  component: 'forum-topics',
};

export const NoTopics = () => {
  const topics = document.createElement('forum-topics');

  topics.forum = {
    title: 'General',
    topics: [],
  };

  return topics;
};

export const WithTopics = () => {
  const topics = document.createElement('forum-topics');

  topics.forum = {
    title: 'General',
    topics: [
      {
        forumId: 0,
        title: 'A forum topic',
        comments: [
          {
            topicId: 0,
            user: 'admin',
            content: 'Initial comment appears as the topic description',
          },
        ],
      }
    ],
  };

  return topics;
};
