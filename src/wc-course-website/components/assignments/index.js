import { databaseManager } from '../../database';
import { DatabaseConsumer } from '../base/databaseConsumer';
import { Assignment } from '../assignment';
import { createUrl } from '../../utilities/createUrl';

export class Assignments extends DatabaseConsumer(window.HTMLElement) {
  constructor() {
    super();

    this.assignmentsTemplateId = '#assignments-list';
  }

  notified() {
    this.render();
  }

  render() {
    const assignments = databaseManager.getAssignments();

    const assignmentsTemplate = document.querySelector(this.assignmentsTemplateId).content;
    const assignmentsNode = assignmentsTemplate.cloneNode(true);
    const container = assignmentsNode.querySelector('[data-element="assignments"]');

    assignments.forEach(assignment => {
      const node = new Assignment();
      node.assignment = assignment;
      container.appendChild(node);
    });

    const query = new window.URL(window.location.toString());
    if (query.searchParams.has('new')) {
      const close = () => {
        window.location.href = createUrl('assignments');
      };

      const modal = assignmentsNode.querySelector('[data-element="new-modal"]');
      modal.classList.add('is-active');

      modal.querySelector('[data-element="new-form"]').onsubmit = event => {
        event.preventDefault();

        const name = event.target.querySelector('input').value;

        const tutorial = databaseManager.addAssignment(name);
        window.location.href = createUrl('assignment', tutorial.$loki);
      };

      modal.querySelector('[data-element="cancel-button"]').onclick = close;
      modal.querySelector('[data-element="close-button"]').onclick = close;
    }

    this.innerHTML = '';
    this.appendChild(assignmentsNode);
  }
}

window.customElements.define('assignments-list', Assignments);
