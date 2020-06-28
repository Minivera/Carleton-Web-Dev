import { databaseManager } from '../../database';
import { DatabaseConsumer } from '../base/databaseConsumer';
import { Tutorial } from '../tutorial';
import { createUrl } from '../../utilities/createUrl';

export class Tutorials extends DatabaseConsumer(window.HTMLElement) {
  constructor() {
    super();

    this.tutorialsTemplateId = '#tutorials-list';
  }

  notified() {
    this.render();
  }

  render() {
    const tutorials = databaseManager.getTutorials();

    const tutorialsTemplate = document.querySelector(this.tutorialsTemplateId).content;
    const tutorialsNode = tutorialsTemplate.cloneNode(true);
    const container = tutorialsNode.querySelector('[data-element="tutorials"]');

    tutorials.forEach(tutorial => {
      const node = new Tutorial();
      node.tutorial = tutorial;
      container.appendChild(node);
    });

    const query = new window.URL(window.location.toString());
    if (query.searchParams.has('new')) {
      const close = () => {
        window.location.href = createUrl('tutorials');
      };

      const modal = tutorialsNode.querySelector('[data-element="new-modal"]');
      modal.classList.add('is-active');

      modal.querySelector('[data-element="new-form"]').onsubmit = event => {
        event.preventDefault();

        const name = event.target.querySelector('input').value;

        const tutorial = databaseManager.addTutorial(name);
        window.location.href = createUrl('tutorial', tutorial.$loki);
      };

      modal.querySelector('[data-element="cancel-button"]').onclick = close;
      modal.querySelector('[data-element="close-button"]').onclick = close;
    }

    this.innerHTML = '';
    this.appendChild(tutorialsNode);
  }
}

window.customElements.define('tutorials-list', Tutorials);
