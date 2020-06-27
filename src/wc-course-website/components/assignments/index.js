import { databaseManager } from '../../database';

class Assignments extends window.HTMLElement {
  constructor() {
    super();

    this.assignmentsTemplateId = '#assignments-list';

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

    const assignments = databaseManager.getAssignments();

    const assignmentsTemplate = document.querySelector(this.assignmentsTemplateId).content;
    const assignmentsNode = assignmentsTemplate.cloneNode(true);
    const container = assignmentsNode.querySelector('[data-element="assignments"]');

    assignments.forEach(assignment => {
      const node = document.createElement('div', { is: 'single-assignment' });
      node.setAttribute('assignment-id', assignment.$loki);
      container.appendChild(node);
    });

    this.innerHTML = '';
    this.appendChild(assignmentsNode);
  }
}

window.customElements.define('assignments-list', Assignments);
