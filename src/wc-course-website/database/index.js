import Loki from 'lokijs';

import lectures from '../data/lecture-data.json';
import assignments from '../data/assignment-data.json';
import tutorials from '../data/tutorial-data.json';

const databaseManager = {
  currentId: 0,
  ready: false,
  subscribers: [],

  init() {
    this.content = new Loki('courseWebsite.db', {
      persistenceMethod: 'localStorage',
      autoload: true,
      autoloadCallback: this.initalState.bind(this),
    });
  },

  initalState() {
    if (!this.content.getCollection('lectures')) {
      this.content.addCollection('lectures').insert(lectures);
    }
    if (!this.content.getCollection('assignments')) {
      this.content.addCollection('assignments').insert(assignments);
    }
    if (!this.content.getCollection('tutorials')) {
      this.content.addCollection('tutorials').insert(tutorials);
    }
    if (!this.content.getCollection('forums')) {
      this.content.addCollection('forums').insert([
        {
          title: 'Announcements',
        },
        {
          title: 'General',
        }
      ]);
    }
    if (!this.content.getCollection('forumTopics')) {
      this.content.addCollection('forumTopics');
    }
    if (!this.content.getCollection('topicComments')) {
      this.content.addCollection('topicComments');
    }

    this.content.saveDatabase();
    this.ready = true;
    this.notify();
  },

  subscribe(subscribeFunc) {
    const subscriber = {
      id: this.currentId++,
      callback: subscribeFunc,
    };
    this.subscribers.push(subscriber);
    return () => this.unsubscribe(subscriber.id);
  },

  unsubscribe(id) {
    this.subscribers = this.subscribers.filter(sub => sub.id !== id);
  },

  notify() {
    // Wait for any events to stop running before we notify
    window.setTimeout(() => {
      this.subscribers.forEach(sub => sub.callback());
    }, 1);
  },

  insertElement(collection, element) {
    const doc = this.content.getCollection(collection).insert(element);
    this.content.saveDatabase();
    this.notify();
    return doc;
  },

  deleteElement(collection, element) {
    this.content.getCollection(collection).remove(element);
    this.content.saveDatabase();
    this.notify();
  },

  getElement(collection, id) {
    return this.content.getCollection(collection).get(id, false);
  },

  getElements(collection) {
    return this.content.getCollection(collection).data;
  },

  // Course content helper methods
  addLecture(newName) {
    return this.insertElement('lectures', {
      ...lectures[0],
      unit: newName,
    });
  },

  addAssignment(newName) {
    return this.insertElement('assignments', {
      ...assignments[0],
      name: newName,
    });
  },

  addTutorial(newName) {
    return this.insertElement('tutorials', {
      ...tutorials[0],
      name: newName,
    });
  },

  deleteLecture(lecture) {
    this.deleteElement('lectures', lecture);
  },

  deleteAssignment(assignment) {
    this.deleteElement('assignments', assignment);
  },

  deleteTutorial(tutorial) {
    this.deleteElement('tutorials', tutorial);
  },

  getLecture(id) {
    return this.getElement('lectures', id);
  },

  getAssignment(id) {
    return this.getElement('assignments', id);
  },

  getTutorial(id) {
    return this.getElement('tutorials', id);
  },

  getLectures() {
    return this.getElements('lectures');
  },

  getAssignments() {
    return this.getElements('assignments');
  },

  getTutorials() {
    return this.getElements('tutorials');
  },

  // Forum help methods
  addForumTopic(id, title, user, content) {
    const topic = this.insertElement('forumTopics', {
      forumId: id,
      title,
    });
    const comment = this.insertElement('topicComments', {
      topicId: topic.$loki,
      user,
      content,
    });

    this.content.saveDatabase();
    return {
      ...topic,
      comments: [comment],
    };
  },

  addTopicComment(id, user, content) {
    const comment = this.insertElement('topicComments', {
      topicId: id,
      user,
      content,
    });
    this.content.saveDatabase();
    return comment;
  },

  deleteForumTopic(topic) {
    this.deleteElement('forumTopics', topic);
    this.content.getCollection('topicComments').removeWhere(obj => obj.topicId === topic.id);
    this.content.saveDatabase();
  },

  deleteTopicComment(comment) {
    this.deleteElement('topicComments', comment);
  },

  getForum(id) {
    const forum = this.getElement('forums', id);
    forum.topics = this.content.getCollection('forumTopics').find({
      forumId: forum.$loki,
    }).map(topic => ({
      ...topic,
      comments: this.content.getCollection('topicComments').find({
        topicId: topic.$loki,
      }),
    }));
    return forum;
  },

  getForumTopic(id) {
    const topic = this.getElement('forumTopics', id);
    topic.comments = this.content.getCollection('topicComments').find({
      topicId: topic.$loki,
    });
    return topic;
  },

  getForums() {
    return this.getElements('forums').map(forum => ({
      ...forum,
      topics: this.content.getCollection('forumTopics').find({
        forumId: forum.$loki,
      }),
    }));
  },
};

databaseManager.init();

export { databaseManager };
