import { Collapsible } from '../base/collapsible';

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
