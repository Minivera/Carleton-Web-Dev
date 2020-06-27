import { databaseManager } from '../../database';

class Lectures extends window.HTMLElement {
  constructor() {
    super();

    this.lecturesTemplateId = '#lectures-list';

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

    const lectures = databaseManager.getLectures();

    const lecturesTemplate = document.querySelector(this.lecturesTemplateId).content;
    const lecturesNode = lecturesTemplate.cloneNode(true);
    const container = lecturesNode.querySelector('[data-element="lectures"]');

    lectures.forEach(lecture => {
      const node = document.createElement('div', { is: 'single-lecture' });
      node.setAttribute('lecture-id', lecture.$loki);
      container.appendChild(node);
    });

    this.innerHTML = '';
    this.appendChild(lecturesNode);
  }
}

window.customElements.define('lectures-list', Lectures);
