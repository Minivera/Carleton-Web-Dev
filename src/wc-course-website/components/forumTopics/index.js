import { databaseManager } from '../../database';
import { users, getUser } from '../../data/users';
import { createUrl } from '../../utilities/createUrl';
import { DatabaseConsumer } from '../base/databaseConsumer';

/**
 * List of forum topics for a specific forum. Will render all the topics without any ability for filtering or sorting.
 * Will render the forum passed trough properties or through the `forum` search param. All events are handled
 * internally through the database manager.
 *
 * @prop {Forum} forum - Write only forum property to define which forum to render.
 *
 * @element forum-topics
 */
export class ForumTopics extends DatabaseConsumer(window.HTMLElement) {
  constructor() {
    super();

    this.forumTopicsTemplateId = '#forum-topics';

    this.forumData = null;
  }

  notified() {
    this.render();
  }

  set forum(forum) {
    this.forumData = forum;
    this.render();
  }

  render() {
    let forum = null;
    const query = new window.URL(window.location.toString());
    if (this.forumData) {
      forum = this.forumData;
    } else if (query.searchParams.has('forum')) {
      const forumId = query.searchParams.get('forum');
      forum = databaseManager.getForum(forumId);
    } else {
      return;
    }

    if (!forum) {
      return;
    }

    const forumTopicsTemplate = document.querySelector(this.forumTopicsTemplateId).content;
    const forumTopicsNode = forumTopicsTemplate.cloneNode(true);

    if (forum.topics.length) {
      forum.topics.forEach(topic => {
        const topicTemplate = forumTopicsNode.querySelector('[data-list="forum-topic"]').content;
        const topicNode = topicTemplate.cloneNode(true);

        const firstComment = topic.comments[0];
        const currentUser = getUser(firstComment.user);
        const avatar = topicNode.querySelector('[data-element="author-avatar"]');

        avatar.src = currentUser.avatar;
        avatar.alt = currentUser.name;

        const title = topicNode.querySelector('[data-element="title"]');
        title.href = createUrl('topic', forum.$loki, topic.$loki);
        title.innerText = topic.title;

        topicNode.querySelector('[data-element="author-name"]').innerText = currentUser.name;
        topicNode.querySelector('[data-element="author-email"]').innerText = currentUser.email;

        const container = topicNode.querySelector('[data-element="content"]');
        firstComment.content.split('\n').forEach(el => {
          const node = document.createElement('p');
          node.innerHTML = el;
          container.prepend(node);
        });

        topicNode.querySelector('[data-element="delete-button"]').onclick = () => {
          databaseManager.deleteForumTopic(topic);
        };
        forumTopicsNode.prepend(topicNode);
      });
    } else {
      forumTopicsNode.querySelector('[data-element="no-topics"]').style.display = 'block';
    }

    forumTopicsNode.querySelector('[data-element="new-topic"]').onsubmit = event => {
      event.preventDefault();

      const name = event.target.querySelector('[data-element="topic-name"]').value;
      const content = event.target.querySelector('[data-element="topic-content"]').value;

      const topic = databaseManager.addForumTopic(forum.$loki, name, users[0].name, content);
      window.location.href = createUrl('topic', forum.$loki, topic.$loki);
    };

    this.innerHTML = '';
    this.appendChild(forumTopicsNode);
  }
}

window.customElements.define('forum-topics', ForumTopics);
