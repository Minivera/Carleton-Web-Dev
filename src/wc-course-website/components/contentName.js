import { databaseManager } from '../database';
import { DatabaseConsumer } from './base/databaseConsumer';

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
    if (!databaseManager.ready) {
      return;
    }

    let node = null;
    const attr = this.getAttribute('source');
    switch (attr) {
      case 'lectures': {
        node = document.createTextNode(databaseManager.getLecture(this.getId('lecture')).unit);
        break;
      }
      case 'tutorials': {
        node = document.createTextNode(databaseManager.getTutorial(this.getId('tutorial')).name);
        break;
      }
      case 'assignments': {
        node = document.createTextNode(databaseManager.getAssignment(this.getId('assignment')).name);
        break;
      }
      case 'forums': {
        node = document.createTextNode(databaseManager.getForum(this.getId('forum')).title);
        break;
      }
      case 'topics': {
        node = document.createTextNode(databaseManager.getForumTopic(this.getId('topic')).title);
        break;
      }
      default:
        throw new Error(`Unknown course content type ${attr}`);
    }

    this.innerHTML = '';
    this.appendChild(node);
  }
}

window.customElements.define('content-name', ContentName);
