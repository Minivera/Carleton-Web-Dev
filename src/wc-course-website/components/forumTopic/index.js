import { databaseManager } from '../../database';
import { users, getUser } from '../../data/users';

class ForumTopic extends window.HTMLElement {
  constructor() {
    super();

    this.forumTopicTemplateId = '#forum-topic';

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

    let topicId = null;
    const query = new window.URL(window.location.toString());
    if (query.searchParams.has('topic')) {
      topicId = query.searchParams.get('topic');
    } else {
      return;
    }

    const topic = databaseManager.getForumTopic(topicId);

    const topicTemplate = document.querySelector(this.forumTopicTemplateId).content;
    const topicNode = topicTemplate.cloneNode(true);

    const firstComment = topic.comments[0];
    const currentUser = getUser(firstComment.user);
    const avatar = topicNode.querySelector('[data-element="author-avatar"]');

    avatar.src = currentUser.avatar;
    avatar.alt = currentUser.name;

    const title = topicNode.querySelector('[data-element="title"]');
    title.innerText = topic.title;

    topicNode.querySelector('[data-element="author-name"]').innerText = currentUser.name;
    topicNode.querySelector('[data-element="author-email"]').innerText = currentUser.email;

    const container = topicNode.querySelector('[data-element="content"]');
    firstComment.content.split('\n').forEach(el => {
      const node = document.createElement('p');
      node.innerHTML = el;
      container.prepend(node);
    });

    const thread = topicNode.querySelector('[data-element="thread"]');
    topic.comments.slice(1).forEach(comment => {
      const commentTemplate = topicNode.querySelector('[data-element="comment"]').content;
      const commentNode = commentTemplate.cloneNode(true);

      const currentUser = getUser(comment.user);
      const avatar = commentNode.querySelector('[data-element="author-avatar"]');
      avatar.src = currentUser.avatar;
      avatar.alt = currentUser.name;

      commentNode.querySelector('[data-element="author-name"]').innerText = currentUser.name;
      commentNode.querySelector('[data-element="author-email"]').innerText = currentUser.email;

      const container = commentNode.querySelector('[data-element="content"]');
      comment.content.split('\n').forEach(el => {
        const node = document.createElement('p');
        node.innerHTML = el;
        container.prepend(node);
      });

      commentNode.querySelector('[data-element="delete-button"]').onclick = () => {
        databaseManager.deleteTopicComment(comment);
      };

      thread.appendChild(commentNode);
    });

    topicNode.querySelector('[data-element="new-comment"]').onsubmit = event => {
      event.preventDefault();

      const content = event.target.querySelector('[data-element="topic-content"]').value;

      databaseManager.addTopicComment(topic.$loki, users[0].name, content);
    };

    this.innerHTML = '';
    this.appendChild(topicNode);
  }
}

window.customElements.define('forum-topic', ForumTopic);
