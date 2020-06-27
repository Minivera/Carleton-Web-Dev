import { databaseManager } from '../../database';

class Tutorial extends window.HTMLDivElement {
  constructor() {
    super();

    this.tutorialTemplateId = '#single-tutorial';

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

  static get observedAttributes() {
    return ['tutorial-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'tutorial-id' && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    if (!databaseManager.ready) {
      return;
    }

    this.classList.add('panel');
    this.classList.add('is-info');

    let tutorialId = null;
    const query = new window.URL(window.location.toString());
    if (this.hasAttribute('tutorial-id')) {
      tutorialId = this.getAttribute('tutorial-id');
    } else if (query.searchParams.has('tutorial')) {
      tutorialId = query.searchParams.get('tutorial');
    } else {
      return;
    }

    const tutorial = databaseManager.getTutorial(tutorialId);
    if (!tutorial) {
      return;
    }

    const tutorialTemplate = document.querySelector(this.tutorialTemplateId).content;
    const tutorialNode = tutorialTemplate.cloneNode(true);

    const title = tutorialNode.querySelector('[data-element="title-link"]');
    title.href = `/wc-course-website/tutorial/index.html?tutorial=${tutorial.$loki}`;
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
