import { databaseManager } from '../database';

class ContentCount extends window.HTMLElement {
  constructor() {
    super();

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
