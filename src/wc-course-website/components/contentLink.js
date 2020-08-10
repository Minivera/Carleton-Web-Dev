import { DatabaseConsumer } from './base/databaseConsumer';
import { createUrl } from '../utilities/createUrl';

/**
 * Component that will render an anchor with the URL to a specific type in the database. Will find the
 * element using the attribute `element-id` or with a search param equal to the source attribute.
 *
 * @attr {lectures|tutorials|assignments|forums} source - What element to source from the database. Will trigger
 * an error if the source is not one of the valid values.
 *
 * @attr {String} element-id - Id of the element to render the name for.
 *
 * @element content-link
 */
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
        url = createUrl('lecture', this.getId('lecture'));
        break;
      }
      case 'tutorials': {
        url = createUrl('tutorial', this.getId('tutorial'));
        break;
      }
      case 'assignments': {
        url = createUrl('assignment', this.getId('assignment'));
        break;
      }
      case 'forums': {
        url = createUrl('forum', this.getId('forum'));
        break;
      }
      default:
        throw new Error(`Unknown course content type ${attr}`);
    }

    this.innerHTML = `<a href="${url}">${this.innerHTML}</a>`;
  }
}

window.customElements.define('content-link', ContentLink);
