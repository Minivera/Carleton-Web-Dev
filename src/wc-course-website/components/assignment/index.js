import { databaseManager } from '../../database';
import { DatabaseConsumer } from '../base/databaseConsumer';
import { createUrl } from '../../utilities/createUrl';

/**
 * A component that will render a single assignment's panel. Will render the assignment passed trough properties or
 * through the `assignment` search param. All events are handled internally through the database manager.
 *
 * This element extends the base div element and will need to created as `<div is="single-assignment">`
 *
 * @prop {Assignment} assignment - Write only assignment property to define which assignment to render.
 *
 * @element single-assignment
 */
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
