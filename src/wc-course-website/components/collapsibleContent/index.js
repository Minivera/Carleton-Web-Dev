import { dom } from '@fortawesome/fontawesome-svg-core';

class CollapsibleContent extends window.HTMLElement {
  constructor() {
    super();

    this.contentTemplateId = '#collapsible-content';

    this.opened = true;
    this.render();
  }

  toggle() {
    this.opened = !this.opened;
    this.update();
  }

  /**
   * Updates the content of the collapsible content without deleting the entire HTML.
   */
  update() {
    const innerNode = this.shadowRoot.querySelector('[data-element="inner"]');

    let chevronTemplate = null;
    if (this.opened) {
      chevronTemplate = this.shadowRoot.querySelector('[data-element="opened"]').content;
      innerNode.style.transition = 'max-height 1s ease-in-out';
      innerNode.style['max-height'] = '9000px';
      innerNode.style['padding-bottom'] = '20px';
    } else {
      chevronTemplate = this.shadowRoot.querySelector('[data-element="closed"]').content;
      innerNode.style.transition = 'max-height 0.5s cubic-bezier(0, 1, 0, 1)';
      innerNode.style['max-height'] = '0';
      innerNode.style['padding-bottom'] = '0';
    }

    const chevronNode = chevronTemplate.cloneNode(true);
    chevronNode.querySelector('i').setAttribute('data-element', 'chevron');

    const button = this.shadowRoot.querySelector('[data-element="icon-button"]');
    if (button.querySelector('[data-element="chevron"]')) {
      button.replaceChild(chevronNode, button.querySelector('[data-element="chevron"]'));
    } else {
      button.appendChild(chevronNode);
    }
  }

  /**
   * Renders the collapsible content and it's template inside of the DOM structure. Will delete all the HTML that
   * existed in this node beforehand.
   */
  render() {
    const contentTemplate = document.querySelector(this.contentTemplateId).content;
    const contentNode = contentTemplate.cloneNode(true);
    const innerNode = contentNode.querySelector('[data-element="inner"]');

    const chevronTemplate = contentNode.querySelector('[data-element="opened"]').content;
    innerNode.style.transition = 'max-height 1s ease-in-out';
    innerNode.style['max-height'] = '9000px';
    innerNode.style['padding-bottom'] = '20px';

    const chevronNode = chevronTemplate.cloneNode(true);
    chevronNode.querySelector('i').setAttribute('data-element', 'chevron');

    const button = contentNode.querySelector('[data-element="icon-button"]');
    button.appendChild(chevronNode);
    button.onclick = this.toggle.bind(this);

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = '';
    // Add styles defined in the head
    document.querySelectorAll('head style').forEach(style => {
      this.shadowRoot.appendChild(style.cloneNode(true));
    });
    document.querySelectorAll('head link').forEach(link => {
      this.shadowRoot.appendChild(link.cloneNode(true));
    });

    dom.watch({
      autoReplaceSvgRoot: this.shadowRoot,
      observeMutationsRoot: this.shadowRoot
    });

    // Add the content from the templates
    this.shadowRoot.appendChild(contentNode);
  }
}

window.customElements.define('collapsible-content', CollapsibleContent);
