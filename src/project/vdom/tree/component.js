import { patch } from '../diffing/patchTree';
import '../utils/typeDef';

/**
 * Custom element that allows us to manage components as trees rather than nodes of a tree. These components
 * are stored inside of the actual DOM and keep their own virtual tree. When one is added to the DOM structure,
 * it will render the function stored in factory and mount the virtual nodes into the DOM.
 * @export
 * @class ComponentElement
 * @extends window.HTMLElement
 */
class ComponentElement extends window.HTMLElement {
  /**
   * Class constructor.
   */
  constructor() {
    super();

    /**
     * Stores whether or not the component has mounted the content of its factory. Will not update
     * if it has yet to be mounted.
     * @type {boolean}
     */
    this.mounted = false;

    /**
     * Stores the properties of the component given as attributes when the `createNode` function is called.
     * @type {{}}
     */
    this.props = {};

    /**
     * Stores the virtual children that are to be passed to the factory when rendering.
     * @type {TreeNode|TextNode|HtmlNode}
     */
    this.virtualChild = null;

    /**
     * The factory to execute when this component mounts or update.
     * @type {functionComponent}
     */
    this.factory = () => null;

    /**
     * Object that stores the component's state. Updated with the `setState` method of this class.
     * @type {{}}
     */
    this.state = {};

    /**
     * The tree mounted on this component. When the component updates, this tree is updated in place.
     * @type {TreeNode|TextNode|HtmlNode}
     */
    this.tree = null;

    /**
     * The TreeNode instance for this component to make sure the two can properly communicate.
     * @type {TreeNode}
     */
    this.node = null;
  }

  /**
   * The lifecycle method called by the DOM. Will use the fact that the node has been added to the DOM to
   * mount the content of the factory.
   */
  connectedCallback() {
    this.mount();
  }

  /**
   * The setState method that is passed to the factory for setting the state values stored on this component. If the
   * component has mounted its tree, it will also trigger an update.
   * @param key {String} - The name of the state value to update or set.
   * @param value {any} - The value to assign to the part of the state to update.
   */
  setState(key, value) {
    this.state = Object.assign({}, this.state, { [key]: value });
    // Only update the view if the component has been mounted.
    if (this.mounted) {
      this.update();
    }
  }

  /**
   * Update method that will trigger a new render of this virtual tree and execute the diffing algorithm.
   */
  update() {
    const vtree = this.render();
    patch(this.node, this.tree, vtree);
  }

  /**
   * Mount method that is triggered when the component is mounted to the DOM. Will render the tree for the first time
   * and diff it against the empty DOM.
   */
  mount() {
    this.tree = this.render();
    this.mounted = true;
    patch(this.node, null, this.tree);
  }

  /**
   * Render method used to render the factory using the component's state and properties.
   * @private
   * @returns {TreeNode|TextNode|HtmlNode} Returns the rendered factory.
   */
  render() {
    return this.factory({
      ...this.props,
      children: this.virtualChild,
    }, { ...this.state, setState: this.setState.bind(this) });
  }
}

window.customElements.define('vdom-component', ComponentElement);
