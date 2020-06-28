import { databaseManager } from '../database';
import { DatabaseConsumer } from './base/databaseConsumer';

/**
 * Component that will render the name of a specific element of a specific type in the database. Will find the
 * element using the attribute `element-id` or with a search param equal to the source attribute.
 *
 * @attr {lectures|tutorials|assignments|forums|topics} source - What element to source from the database. Will trigger
 * an error if the source is not one of the valid values.
 *
 * @attr {String} element-id - Id of the element to render the name for.
 *
 * @element content-name
 */
class ContentName extends DatabaseConsumer(window.HTMLElement) {
  notified() {
    this.render();
  }

  getId(source) {
    const query = new window.URL(window.location.toString());
    if (this.hasAttribute('element-id')) {
      return this.getAttribute('element-id');
    } else if (query.searchParams.has(source)) {
      return parseInt(query.searchParams.get(source));
    }
    return -1;
  }

  render() {
    let text = null;
    const attr = this.getAttribute('source');
    switch (attr) {
      case 'lectures': {
        text = databaseManager.getLecture(this.getId('lecture')).unit;
        break;
      }
      case 'tutorials': {
        text = databaseManager.getTutorial(this.getId('tutorial')).name;
        break;
      }
      case 'assignments': {
        text = databaseManager.getAssignment(this.getId('assignment')).name;
        break;
      }
      case 'forums': {
        text = databaseManager.getForum(this.getId('forum')).title;
        break;
      }
      case 'topics': {
        text = databaseManager.getForumTopic(this.getId('topic')).title;
        break;
      }
      default:
        throw new Error(`Unknown course content type ${attr}`);
    }

    this.innerText = text;
  }
}

window.customElements.define('content-name', ContentName);
