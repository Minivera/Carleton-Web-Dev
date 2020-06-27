import { databaseManager } from '../../database';

class Tutorials extends window.HTMLElement {
  constructor() {
    super();

    this.tutorialsTemplateId = '#tutorials-list';

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

    const tutorials = databaseManager.getTutorials();

    const tutorialsTemplate = document.querySelector(this.tutorialsTemplateId).content;
    const tutorialsNode = tutorialsTemplate.cloneNode(true);
    const container = tutorialsNode.querySelector('[data-element="tutorials"]');

    tutorials.forEach(tutorial => {
      const node = document.createElement('div', { is: 'single-tutorial' });
      node.setAttribute('tutorial-id', tutorial.$loki);
      container.appendChild(node);
    });

    this.innerHTML = '';
    this.appendChild(tutorialsNode);
  }
}

window.customElements.define('tutorials-list', Tutorials);
