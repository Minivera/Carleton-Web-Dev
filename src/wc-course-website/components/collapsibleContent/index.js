import { Collapsible } from '../base/collapsible';

/**
 * Collapsible content that renders its content with the ability to click a chevron icon
 * to collapse or expand it. Expanded by default.
 *
 * @attr {String} title - title to display next to the icon and above the content.
 *
 * @element collapsible-content
 */
export class CollapsibleContent extends Collapsible {
  constructor() {
    super('#collapsible-content', true);
  }

  render() {
    super.render();

    const titleNode = this.querySelector('[data-element="title"]');
    titleNode.innerText = this.getAttribute('title');
  }
}

window.customElements.define('collapsible-content', CollapsibleContent);
