/**
 * Base class for collapsible custom element. Manages the collapsed state of the inner content.
 *
 * Requires a template with the following elements:
 * - [data-element="inner"] for the container that will host the hiddeable content.
 * - [data-element="icon-button"] for the button that will control the collapsing/expanding.
 * - [data-element="opened"] for the icon to show when expanded.
 * - [data-element="closed"] for the icon to show when collapsed.
 */
export class Collapsible extends window.HTMLElement {
  constructor(templateId, defaultValue = false) {
    super();

    this.contentTemplateId = templateId;

    this.opened = defaultValue;
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
    const innerNode = this.querySelector('[data-element="inner"]');

    if (this.opened) {
      this.querySelector('[data-element="opened"]').style.display = 'block';
      this.querySelector('[data-element="closed"]').style.display = 'none';
      innerNode.style.transition = 'max-height 1s ease-in-out';
      innerNode.style['max-height'] = '9000px';
      innerNode.style['padding-bottom'] = '20px';
    } else {
      this.querySelector('[data-element="opened"]').style.display = 'none';
      this.querySelector('[data-element="closed"]').style.display = 'block';
      innerNode.style.transition = 'max-height 0.5s cubic-bezier(0, 1, 0, 1)';
      innerNode.style['max-height'] = '0';
      innerNode.style['padding-bottom'] = '0';
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

    const button = contentNode.querySelector('[data-element="icon-button"]');
    button.onclick = this.toggle.bind(this);

    innerNode.innerHTML = this.innerHTML;

    this.innerHTML = '';
    // Add the content from the templates
    this.appendChild(contentNode);

    // Trigger the update method
    this.update();
  }
}
