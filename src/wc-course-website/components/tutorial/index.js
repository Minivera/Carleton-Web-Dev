import { databaseManager } from '../../database';
import { DatabaseConsumer } from '../base/databaseConsumer';
import { createUrl } from '../../utilities/createUrl';

export class Tutorial extends DatabaseConsumer(window.HTMLDivElement) {
  constructor() {
    super();

    this.tutorialTemplateId = '#single-tutorial';

    this.tutorialData = null;
  }

  notified() {
    this.render();
  }

  set tutorial(tutorial) {
    this.tutorialData = tutorial;
    this.render();
  }

  render() {
    this.classList.add('panel');
    this.classList.add('is-info');

    let tutorial = null;
    const query = new window.URL(window.location.toString());
    if (this.tutorialData) {
      tutorial = this.tutorialData;
    } else if (query.searchParams.has('tutorial')) {
      const tutorialId = query.searchParams.get('tutorial');
      tutorial = databaseManager.getTutorials(tutorialId);
    } else {
      return;
    }

    if (!tutorial) {
      return;
    }

    const tutorialTemplate = document.querySelector(this.tutorialTemplateId).content;
    const tutorialNode = tutorialTemplate.cloneNode(true);

    const title = tutorialNode.querySelector('[data-element="title-link"]');
    title.href = createUrl('tutorial', tutorial.$loki);
    title.innerText = tutorial.name;

    const deletePath = this.getAttribute('delete-path');
    const deleteButton = tutorialNode.querySelector('[data-element="delete-button"]');
    deleteButton.onclick = () => {
      databaseManager.deleteTutorial(tutorial);
      if (deletePath) {
        window.location.href = deletePath;
      }
    };

    const specfileTemplate = tutorialNode.querySelector('[data-list="specfile"]').content;
    if (tutorial.specfile) {
      const node = specfileTemplate.cloneNode(true);
      const container = node.querySelector('div');
      container.appendChild(document.createTextNode(tutorial.specfile.title));
      tutorialNode.appendChild(node);
    }

    const resourcesTemplate = tutorialNode.querySelector('[data-list="resources"]').content;
    if (tutorial.resources) {
      tutorial.resources.forEach(resource => {
        const node = resourcesTemplate.cloneNode(true);
        const container = node.querySelector('div');
        container.appendChild(document.createTextNode(resource.title));
        tutorialNode.appendChild(node);
      });
    }

    this.innerHTML = '';
    this.appendChild(tutorialNode);
  }
}

window.customElements.define('single-tutorial', Tutorial, { extends: 'div' });
