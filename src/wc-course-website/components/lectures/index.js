import { databaseManager } from '../../database';
import { DatabaseConsumer } from '../base/databaseConsumer';
import { Lecture } from '../lecture';
import { createUrl } from '../../utilities/createUrl';

/**
 * List of lectures from the database. Will render all lectures without any filtering or sorting.
 *
 * @element lectures-list
 */
export class Lectures extends DatabaseConsumer(window.HTMLElement) {
  constructor() {
    super();

    this.lecturesTemplateId = '#lectures-list';
  }

  notified() {
    this.render();
  }

  render() {
    const lectures = databaseManager.getLectures();

    const lecturesTemplate = document.querySelector(this.lecturesTemplateId).content;
    const lecturesNode = lecturesTemplate.cloneNode(true);
    const container = lecturesNode.querySelector('[data-element="lectures"]');

    lectures.forEach(lecture => {
      const node = new Lecture();
      node.lecture = lecture;
      container.appendChild(node);
    });

    const query = new window.URL(window.location.toString());
    if (query.searchParams.has('new')) {
      const close = () => {
        window.location.href = createUrl('lectures');
      };

      const modal = lecturesNode.querySelector('[data-element="new-modal"]');
      modal.classList.add('is-active');

      modal.querySelector('[data-element="new-form"]').onsubmit = event => {
        event.preventDefault();

        const name = event.target.querySelector('input').value;

        const lecture = databaseManager.addLecture(name);
        window.location.href = createUrl('lecture', lecture.$loki);
      };

      modal.querySelector('[data-element="cancel-button"]').onclick = close;
      modal.querySelector('[data-element="close-button"]').onclick = close;
    }

    this.innerHTML = '';
    this.appendChild(lecturesNode);
  }
}

window.customElements.define('lectures-list', Lectures);
