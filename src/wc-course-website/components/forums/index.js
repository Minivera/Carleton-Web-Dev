import { databaseManager } from '../../database';
import { DatabaseConsumer } from '../base/databaseConsumer';
import { createUrl } from '../../utilities/createUrl';

export class Forums extends DatabaseConsumer(window.HTMLElement) {
  constructor() {
    super();

    this.forumsTemplateId = '#forums-list';
  }

  notified() {
    this.render();
  }

  render() {
    const forums = databaseManager.getForums();

    const forumsTemplate = document.querySelector(this.forumsTemplateId).content;
    const forumsNode = forumsTemplate.cloneNode(true);
    const container = forumsNode.querySelector('[data-element="forums"]');
    const singleForumTemplate = forumsNode.querySelector('[data-element="single-forum"]').content;

    forums.forEach(forum => {
      const node = singleForumTemplate.cloneNode(true);
      const title = node.querySelector('[data-element="title"]');
      title.href = createUrl('forum', forum.$loki);
      title.innerText = `${forum.title} - ${forum.topics.length} topics`;
      container.appendChild(node);
    });

    this.innerHTML = '';
    this.appendChild(forumsNode);
  }
}

window.customElements.define('forums-list', Forums);
