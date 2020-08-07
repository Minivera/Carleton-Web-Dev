/**
 * HTML node class that manages an HTML element in the virtual Tree.
 * @todo Support SVGs
 * @export
 * @class HtmlNode
 */
export class HtmlNode {
  /**
   * Class constructor that stores the values.
   * @param {Object} props - The properties given to this constructor.
   * @param {String} props.tag - Tag name to create in the DOM when this node is mounted.
   * @param {object} props.attributes - Attributes to assign to the HTML node when created.
   * @param {(TreeNode|HtmlNode|TextNode)[]} props.children - The children to assign to the HTML node when created.
   */
  constructor({ tag, attributes, children }) {
    /**
     * Tag for creating the HTMLElement in the DOM when mounting.
     * @type {String}
     */
    this.tag = tag;

    /**
     * Attributes to assign to the HTMLElement when mounting or updating.
     * @type {Object}
     */
    this.attributes = attributes;

    /**
     * Virtual children that will have to be patched into the virtual DOM node when mounting or updating.
     * @type {(TreeNode|HtmlNode|TextNode)[]}
     */
    this.children = children;

    /**
     * DOM node assigned to this virtual node for easy access.
     * @type {HTMLElement}
     */
    this.domNode = null;
  }

  /**
   * Diffing function that returns if the two nodes are the same or not.
   * @param other {TreeNode|HtmlNode|TextNode}
   * @returns {boolean} Returns true if the two nodes are the same, false otherwise.
   */
  diff(other) {
    if (!(other instanceof HtmlNode)) {
      return false;
    }
    if (this.tag !== other.tag) {
      return false;
    }
    return !Object.entries(this.attributes).find(([key, value]) => other.attributes[key] !== value);
  }
}
