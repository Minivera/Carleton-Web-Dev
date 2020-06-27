import { databaseManager } from '../database';

class ContentLink extends window.HTMLElement {
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

    let url = null;
    const attr = this.getAttribute('source');
    switch (attr) {
      case 'lectures': {
        url = `/wc-course-website/lecture/index.html?lecture=${
          databaseManager.getLecture(this.getId('lecture')).$loki
        }`;
        break;
      }
      case 'tutorials': {
        url = `/wc-course-website/tutorial/index.html?tutorial=${
          databaseManager.getTutorial(this.getId('tutorial')).$loki
        }`;
        break;
      }
      case 'assignments': {
        url = `/wc-course-website/assignment/index.html?assignment=${
          databaseManager.getAssignment(this.getId('assignment')).$loki
        }`;
        break;
      }
      case 'forums': {
        url = `/wc-course-website/forum/index.html?forum=${databaseManager.getForum(this.getId('forum')).$loki}`;
        break;
      }
      default:
        throw new Error(`Unknown course content type ${attr}`);
    }

    this.innerHTML = `<a href="${url}">${this.innerHTML}</a>`;
  }
}

window.customElements.define('content-link', ContentLink);
