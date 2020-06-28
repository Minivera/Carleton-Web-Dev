import { databaseManager } from '../../database';
import { DatabaseConsumer } from '../base/databaseConsumer';
import { createUrl } from '../../utilities/createUrl';

export class Assignment extends DatabaseConsumer(window.HTMLDivElement) {
  constructor() {
    super();

    this.assignmentTemplateId = '#single-assignment';

    this.assignmentData = null;
  }

  notified() {
    this.render();
  }

  set assignment(assignment) {
    this.assignmentData = assignment;
    this.render();
  }

  render() {
    this.classList.add('panel');
    this.classList.add('is-success');

    let assignment = null;
    const query = new window.URL(window.location.toString());
    if (this.assignmentData) {
      assignment = this.assignmentData;
    } else if (query.searchParams.has('assignment')) {
      const assignmentId = query.searchParams.get('assignment');
      assignment = databaseManager.getAssignment(assignmentId);
    } else {
      return;
    }

    if (!assignment) {
      return;
    }

    const assignmentTemplate = document.querySelector(this.assignmentTemplateId).content;
    const assignmentNode = assignmentTemplate.cloneNode(true);

    const title = assignmentNode.querySelector('[data-element="title-link"]');
    title.href = createUrl('assignment', assignment.$loki);
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
