import '../utils/typeDef';

/**
 * Tree node class that manages component based classes. When the node creator hits a function, it will
 * create an instance of this class.
 * @export
 * @class TreeNode
 */
export class TreeNode {
  /**
   * Class constructor that stores the values.
   * @param {Object} props - The properties given to this constructor.
   * @param {functionComponent} props.factory - Component to build when this node is rendered in the view.
   * @param {object} props.attributes - Attributes to pass to the factory when called.
   * @param {(TreeNode|HtmlNode|TextNode)[]} props.children - The children to pass to the factory when called.
   */
  constructor({ factory, attributes, children }) {
    /**
     * Stores the factory used to render this component.
     * @type {functionComponent}
     */
    this.factory = factory;

    /**
     * The attributes assigned to this node, will be passed to the factory when it is executed.
     * @type {Object}
     */
    this.attributes = attributes;

    /**
     * Children of the node. Will be passed to the factory when it is execute. Not to confuse with the children
     * rendered by the factory.
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
    if (!(other instanceof TreeNode)) {
      return false;
    }
    if (Object.entries(this.attributes).find(([key, value]) => other.attributes[key] !== value)) {
      return false;
    }
    return this.factory === other.factory;
  }
}
