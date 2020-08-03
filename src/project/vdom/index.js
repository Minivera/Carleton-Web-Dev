import './tree/component';
import { createNode } from './nodes/factory';
import { TreeNode } from './nodes/treeNode';
import { applyContext } from './context/applyContext';
import { withStateReducer } from './context/reducerContext';
import { withCallback } from './context/callbackContext';

/**
 * Constructor that enables the creation of a virtual DOM tree for the given component. This constructor can be called
 * multiple times on different components, there is no limit to the amount of virtual trees in a single page.
 *
 * @example
 * new VirtualDOM(App).renderInto("#app");
 * @example
 * // You can also cache the tree for rendering in multiple locations
 * const app = new VirtualDOM(App);
 * app.renderInto("#app");
 * app.renderInto("#other-app");
 * @param root {TreeNode} - The component to render as the root of this tree.
 * @returns {{renderInto: renderInto}} Returns an object that can be chained to render this application into
 * multiple nodes.
 * @constructor
 * @export
 */
export function VirtualDOM(root) {
  return {
    /**
     * Function that will render this application in the given HTMLElement.
     * @param element {HTMLElement} - The element to use as the root of the application.
     */
    renderInto: element => {
      if (typeof root !== 'function') {
        throw new Error('The root of a virtual DOM tree must be a component');
      }
      const rootElement = document.createElement('vdom-component');
      const virtualNode = new TreeNode({ factory: root, children: [], attributes: {} });
      virtualNode.domNode = rootElement;
      rootElement.setAll(root, {}, null, virtualNode);
      element.appendChild(rootElement);
    },
  };
}

export { createNode as h, applyContext, withStateReducer, withCallback };
