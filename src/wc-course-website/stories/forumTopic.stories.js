import '../components/forumTopic';

export default {
  title: 'Forum topic',
  component: 'forum-topic',
};

export const TopicWithComments = () => {
  const topic = document.createElement('forum-topic');

  topic.topic = {
    forumId: 0,
    title: 'A forum topic',
    comments: [
      {
        topicId: 0,
        user: 'admin',
        content: 'Initial comment appears as the topic description',
      },
      {
        topicId: 0,
        user: 'student',
        content: 'Other comments appear as discussion',
      }
    ],
  };

  return topic;
};
