import { databaseManager } from '../database';
import { DatabaseConsumer } from './base/databaseConsumer';
import { createUrl } from '../utilities/createUrl';

class ContentLink extends DatabaseConsumer(window.HTMLElement) {
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
    let url = null;
    const attr = this.getAttribute('source');
    switch (attr) {
      case 'lectures': {
        url = createUrl('lecture', databaseManager.getLecture(this.getId('lecture')).$loki);
        break;
      }
      case 'tutorials': {
        url = createUrl('tutorial', databaseManager.getTutorial(this.getId('tutorial')).$loki);
        break;
      }
      case 'assignments': {
        url = createUrl('assignment', databaseManager.getAssignment(this.getId('assignment')).$loki);
        break;
      }
      case 'forums': {
        url = createUrl('forum', databaseManager.getForum(this.getId('forum')).$loki);
        break;
      }
      default:
        throw new Error(`Unknown course content type ${attr}`);
    }

    this.innerHTML = `<a href="${url}">${this.innerHTML}</a>`;
  }
}

window.customElements.define('content-link', ContentLink);
