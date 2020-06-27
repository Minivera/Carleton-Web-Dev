import { databaseManager } from '../../database';
import { users, getUser } from '../../data/users';

class ForumTopics extends window.HTMLElement {
  constructor() {
    super();

    this.forumTopicsTemplateId = '#forum-topics';

    this.unsuscriber = null;
    this.render();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.unsuscriber = databaseManager.subscribe(this.render.bind(this));
    }
  }

  disconnectedCallback() {
    if (this.unsuscriber) {
      this.unsuscriber();
    }
  }

  render() {
    if (!databaseManager.ready) {
      return;
    }

    let forumId = null;
    const query = new window.URL(window.location.toString());
    if (this.hasAttribute('forum-id')) {
      forumId = this.getAttribute('forum-id');
    } else if (query.searchParams.has('forum')) {
      forumId = query.searchParams.get('forum');
    } else {
      return;
    }

    const forum = databaseManager.getForum(forumId);

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
        title.href = `/wc-course-website/forum/topic/index.html?forum=${forum.$loki}&topic=${topic.$loki}`;
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

      databaseManager.addForumTopic(forum.$loki, name, users[0].name, content);
    };

    this.innerHTML = '';
    this.appendChild(forumTopicsNode);
  }
}

window.customElements.define('forum-topics', ForumTopics);
