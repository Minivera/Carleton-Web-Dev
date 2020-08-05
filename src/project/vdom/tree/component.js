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
     * The context is a special function that takes in a context object and will return a context object. By executing
     * the given function, it will run the `apply` function on each of the context objects applied on the component and
     * return the updated context to augment the component with.
     * @type {function(Object): Object}
     */
    this.contextCreator = context => context;

    /**
     * Object that stores the component's context data. Updated with state management capabilities for the framework.
     * @type {{}}
     */
    this.context = {
      setState: (key, value) => {
        this.context[key] = value;
        this.requestUpdate();
      },
    };

    /**
     * Object containing lifecycle listener functions.
     * @typedef lifecycleListeners
     * @property {function(ComponentElement)} beforeMount - Hook called after the component has been connected to
     * the DOM and before it is mounted.
     * @property {function(ComponentElement)} afterMount - Hook called after the component has been successfully
     * mounted.
     * @property {function(ComponentElement)} beforeUpdate - Hook called before the component is updated and before
     * checking if we should update.
     * @property {function(ComponentElement): boolean} shouldUpdate - Hook called before the component is updated.
     * Return false to prevent updating the component. Does not provide the old or new attributes, the developer
     * is in charge of keep track of those.
     * @property {function(ComponentElement)} afterUpdate - Hook called after an update has been processed.
     * @property {function(ComponentElement)} beforeDisconnect - Hook called before the component is disconnected
     * from the DOM.
     */

    /**
     * Object containing functions that listen to the various lifecycle events of a component. These functions
     * will be executed with the current component as their only parameter.
     * @type {lifecycleListeners}
     */
    this.lifecycleListeners = {
      afterConnect: () => {},
      beforeMount: () => {},
      afterMount: () => {},
      beforeUpdate: () => {},
      shouldUpdate: () => true,
      afterUpdate: () => {},
      beforeDisconnect: () => {},
    };

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
   * Update the values of the DOM component from the values passed in parameter.
   * @param {functionComponent} factory - Function to render the component.
   * @param {{}} props - Properties to give to the factory.
   * @param {TreeNode|TextNode|HtmlNode} virtualChild - Child to give to the factory.
   * @param {TreeNode} node - Underlying virtual node backing the DOM node.
   */
  setAll(factory, props, virtualChild, node) {
    this.factory = factory;
    this.contextCreator = this.factory.contextCreator || (context => context);
    this.props = props;
    this.virtualChild = virtualChild;
    this.node = node;

    this.applyContext();
  }

  /**
   * The lifecycle method called by the DOM. Will use the fact that the node has been added to the DOM to
   * mount the content of the factory.
   */
  connectedCallback() {
    this.mount();
  }

  /**
   * The lifecycle method called by the DOM with the component is disconnected from it.
   */
  disconnectedCallback() {
    this.lifecycleListeners.beforeDisconnect.call(this, this.context);
    this.mounted = false;
  }

  /**
   * Method that executes the context creator on this nodeand saves the updated context.
   */
  applyContext() {
    // Generate the context from the previous context
    const finalContext = this.contextCreator({
      ...this.context,
      requestUpdate: this.requestUpdate.bind(this),
    });

    // Loop on each of the available lifecycle hooks
    [
      'afterConnect',
      'beforeMount',
      'afterMount',
      'beforeUpdate',
      'shouldUpdate',
      'afterUpdate',
      'beforeDisconnect'
    ].forEach(hook => {
      // If the context object has a hook defined and it is a function
      if (finalContext[hook] && typeof finalContext[hook] === 'function') {
        // Add that lifecycle hook to the component properties
        this.listen(hook, finalContext[hook]);
        delete finalContext[hook];
      }
    });

    // Update the element context with the new context.
    this.context = finalContext;
  }

  /**
   * Function that sets a specific lifecycle hook listener. Will do nothing if the lifecycle hook
   * is unknown.
   * @see lifecycleListeners
   * @param {String} hook - Hook to listen to.
   * @param {function} listener - Listener function to set for the given hook.
   */
  listen(hook, listener) {
    if (Object.prototype.hasOwnProperty.call(this.lifecycleListeners, hook)) {
      this.lifecycleListeners[hook] = listener;
    }
  }

  /**
   * Mount method that is triggered when the component is mounted to the DOM. Will render the tree for the first time
   * and diff it against the empty DOM.
   */
  mount() {
    this.tree = this.render();
    this.lifecycleListeners.beforeMount.call(this, this.context);
    patch(this.node, null, this.tree);
    this.mounted = true;
    this.lifecycleListeners.afterMount.call(this, this.context);
  }

  /**
   * Requests and update on the component that will trigger and update if the component is still mounted.
   * @todo Add ability to batch updates
   */
  requestUpdate() {
    if (this.mounted) {
      this.applyContext();
      this.update();
    }
  }

  /**
   * Update method that will trigger a new render of this virtual tree and execute the diffing algorithm.
   */
  update() {
    this.lifecycleListeners.beforeUpdate.call(this, this.context);
    if (!this.lifecycleListeners.shouldUpdate.call(this, this.context)) {
      return;
    }
    const vtree = this.render();
    patch(this.node, this.tree, vtree);
    this.lifecycleListeners.afterUpdate.call(this, this.context);
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
    }, this.context);
  }
}

window.customElements.define('vdom-component', ComponentElement);
