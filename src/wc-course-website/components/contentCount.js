import { databaseManager } from '../database';
import { DatabaseConsumer } from './base/databaseConsumer';

/**
 * Component that will render the number of elements of a specific type in the database.
 *
 * @attr {lectures|tutorials|assignments|forums} source - What element to count from the database. Will trigger
 * an error if the source is not one of the valid values.
 *
 * @element content-count
 */
class ContentCount extends DatabaseConsumer(window.HTMLElement) {
  notified() {
    this.render();
  }

  render() {
    let node = null;
    const attr = this.getAttribute('source');
    switch (attr) {
      case 'lectures': {
        node = document.createTextNode(databaseManager.getLectures().length);
        break;
      }
      case 'tutorials': {
        node = document.createTextNode(databaseManager.getTutorials().length);
        break;
      }
      case 'assignments': {
        node = document.createTextNode(databaseManager.getAssignments().length);
        break;
      }
      case 'forums': {
        node = document.createTextNode(
          databaseManager.getForums().reduce((accumulator, forum) => accumulator + forum.topics.length, 0)
        );
        break;
      }
      default:
        throw new Error(`Unknown course content type ${attr}`);
    }

    this.innerHTML = '';
    this.appendChild(node);
  }
}

window.customElements.define('content-count', ContentCount);
