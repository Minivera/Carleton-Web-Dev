import { databaseManager } from '../../database';

class Assignment extends window.HTMLDivElement {
  constructor() {
    super();

    this.assignmentTemplateId = '#single-assignment';

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
    return ['assignment-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'assignment-id' && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    if (!databaseManager.ready) {
      return;
    }

    this.classList.add('panel');
    this.classList.add('is-success');

    let assignmentId = null;
    const query = new window.URL(window.location.toString());
    if (this.hasAttribute('assignment-id')) {
      assignmentId = this.getAttribute('assignment-id');
    } else if (query.searchParams.has('assignment')) {
      assignmentId = query.searchParams.get('assignment');
    } else {
      return;
    }

    const assignment = databaseManager.getAssignment(assignmentId);
    if (!assignment) {
      return;
    }

    const assignmentTemplate = document.querySelector(this.assignmentTemplateId).content;
    const assignmentNode = assignmentTemplate.cloneNode(true);

    const title = assignmentNode.querySelector('[data-element="title-link"]');
    title.href = `/wc-course-website/assignment/index.html?assignment=${assignment.$loki}`;
    title.innerText = assignment.name;

    const deletePath = this.getAttribute('delete-path');
    const deleteButton = assignmentNode.querySelector('[data-element="delete-button"]');
    deleteButton.onclick = () => {
      databaseManager.deleteAssignment(assignment);
      if (deletePath) {
        window.location.href = deletePath;
      }
    };

    const specfileTemplate = assignmentNode.querySelector('[data-list="specfile"]').content;
    if (assignment.specfile) {
      const node = specfileTemplate.cloneNode(true);
      const container = node.querySelector('div');
      container.appendChild(document.createTextNode(assignment.specfile.title));
      assignmentNode.appendChild(node);
    }

    const resourcesTemplate = assignmentNode.querySelector('[data-list="resources"]').content;
    if (assignment.resources) {
      assignment.resources.forEach(resource => {
        const node = resourcesTemplate.cloneNode(true);
        const container = node.querySelector('div');
        container.appendChild(document.createTextNode(resource.title));
        assignmentNode.appendChild(node);
      });
    }

    this.innerHTML = '';
    this.appendChild(assignmentNode);
  }
}

window.customElements.define('single-assignment', Assignment, { extends: 'div' });
