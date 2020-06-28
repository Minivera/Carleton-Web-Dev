import { Collapsible } from '../base/collapsible';

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
