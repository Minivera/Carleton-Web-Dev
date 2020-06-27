import { databaseManager } from '../../database';

class Forums extends window.HTMLElement {
  constructor() {
    super();

    this.forumsTemplateId = '#forums-list';

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

    const forums = databaseManager.getForums();

    const forumsTemplate = document.querySelector(this.forumsTemplateId).content;
    const forumsNode = forumsTemplate.cloneNode(true);
    const container = forumsNode.querySelector('[data-element="forums"]');
    const singleForumTemplate = forumsNode.querySelector('[data-element="single-forum"]').content;

    forums.forEach(forum => {
      const node = singleForumTemplate.cloneNode(true);
      const title = node.querySelector('[data-element="title"]');
      title.href = `/wc-course-website/forum/index.html?forum=${forum.$loki}`;
      title.innerText = `${forum.title} - ${forum.topics.length} topics`;
      container.appendChild(node);
    });

    this.innerHTML = '';
    this.appendChild(forumsNode);
  }
}

window.customElements.define('forums-list', Forums);
