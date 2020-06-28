import { Collapsible } from '../base/collapsible';

/**
 * Collapsible menu that will render as a list item with a sub-list that can be hidden or expanded through
 * a chevron icon button. Hidden by default.
 *
 * @attr {String} title - title to display next to the icon and above the content.
 *
 * @element collapsible-menu
 */
export class CollapsibleMenu extends Collapsible {
  constructor() {
    super('#collapsible-menu');
  }

  render() {
    super.render();

    const titleNode = this.querySelector('[data-element="title"]');
    titleNode.innerText = this.getAttribute('title');
  }
}

window.customElements.define('collapsible-menu', CollapsibleMenu);
