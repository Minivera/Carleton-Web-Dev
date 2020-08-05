import { HtmlNode } from '../nodes/htmlNode';
import { TextNode } from '../nodes/textNode';
import { TreeNode } from '../nodes/treeNode';

/**
 * Function that will apply the given attributes on the HTML element. The old attributes are passed for removing
 * attributes when needed. For example, if an attribute is present in the old attributes, but not in the new
 * attributes, it should be removed from the DOM node.
 * @todo support namespaced attributes
 * @param {Object} oldAttributes - The old attributes that were assigned to the node before the patch.
 * @param {Object} newAttributes - The new attributes that were assigned to the node after the patch.
 * @param {HTMLElement} node - The node on which to apply the attribute changes.
 */
const applyAttributes = (oldAttributes = {}, newAttributes = {}, node) => {
  Object.keys(oldAttributes).forEach(key => {
    // If the new attributes doesn't have the old attribute
    if (!Object.prototype.hasOwnProperty.call(newAttributes, key) || !newAttributes[key]) {
      // Remove the attribute from the node since it is now gone
      if (typeof node[key] !== 'undefined') {
        // Delete on the node directly if we can
        delete node[key];
      }
      node.removeAttribute(key);
    }
  });
  // Go over the new attributes
  Object.entries(newAttributes).forEach(([key, value]) => {
    if (typeof value !== 'function' && Object.prototype.hasOwnProperty.call(oldAttributes, key) &&
      oldAttributes[key] === value) {
      // If the attribute did not change and is not an event listener, don't bother updating
      return;
    }
    if (typeof node[key] !== 'undefined') {
      // Set on the node directly if we can
      node[key] = value;
    }
    if (typeof value === 'string' || typeof value === 'number') {
      // Set the new attribute value on the node
      node.setAttribute(key, value);
    } else if (typeof value === 'boolean') {
      // For booleans, set the attribute as an empty string if true or remove if false
      if (value) {
        node.setAttribute(key, '');
      } else {
        node.removeAttribute(key);
      }
    }
  });
};

/**
 * Generate a DOM node with the given virtual node. If generating a virtual dom component, it will also assign
 * all the properties on the web component.
 * @param {HtmlNode|TextNode|TreeNode} virtualNode - The node from which to create the DOM node.
 * @returns {Node} - Returns a DOM node that can be used directly.
 */
const generateNode = virtualNode => {
  if (virtualNode instanceof HtmlNode) {
    return document.createElement(virtualNode.tag);
  } else if (virtualNode instanceof TextNode) {
    return document.createTextNode(virtualNode.text);
  } else if (virtualNode instanceof TreeNode) {
    const rootElement = document.createElement('vdom-component');
    rootElement.setAll(virtualNode.factory, virtualNode.attributes, virtualNode.children, virtualNode);
    return rootElement;
  }
};

/**
 * Updates a virtual node and its associated DOM node with the values of the new virtual node.
 * @param {HtmlNode|TextNode|TreeNode} oldNode - The node to update.
 * @param {HtmlNode|TextNode|TreeNode} newNode - The node to update from.
 */
const updateNode = (oldNode, newNode) => {
  if (oldNode instanceof HtmlNode) {
    applyAttributes(oldNode.attributes, newNode.attributes, oldNode.domNode);
    oldNode.attributes = newNode.attributes;
  } else if (oldNode instanceof TextNode) {
    oldNode.text = newNode.text;
    oldNode.domNode.nodeValue = newNode.text;
  } else if (oldNode instanceof TreeNode) {
    // Update the virtual attributes for a component node
    oldNode.attributes = newNode.attributes;
    oldNode.children = newNode.children;
    oldNode.factory = newNode.factory;
    // Update the DOM attributes from the associated web component
    oldNode.domNode.setAll(newNode.factory, newNode.attributes, newNode.children, oldNode);
  }
};

/**
 * Main diffing algorithm that will diff nodes and patch them in place, generating DOM mutations alongside virtual DOM
 * mutations. Will be recursively called on all the nodes in the tree until the entire tree has been patched.
 * @todo Improve performance
 * @param {HtmlNode|TextNode|TreeNode} parent - The parent of the old and new node. Used to add or remove children.
 * @param {HtmlNode|TextNode|TreeNode} oldNode - The node from the tree that is being patched. Is modified by the
 * algorithm.
 * @param {HtmlNode|TextNode|TreeNode} newNode - The node from the new tree used to patch the old tree.
 * @export
 */
export const patch = (parent, oldNode, newNode) => {
  if (!newNode) {
    // If a null or undefined should get here, ignore it.
    return;
  }

  // If Old node does not exists, then we are mounting for the first time
  if (!oldNode) {
    // Generate the dom node
    const domNode = generateNode(newNode);
    newNode.domNode = domNode;
    if (newNode instanceof HtmlNode) {
      applyAttributes({}, newNode.attributes, domNode);
    }

    // Start patching on the new node's children
    if (newNode.children) {
      newNode.children.forEach(child => patch(newNode, null, child));
    }
    parent.domNode.appendChild(domNode);
    return;
  }

  // If the two nodes don't have the same type
  if (oldNode.prototype !== newNode.prototype) {
    // Replace the old child with the new child
    parent.children = parent.children.map(child => {
      if (child === oldNode) {
        return newNode;
      }
      return child;
    });
    const domNode = generateNode(newNode);
    newNode.domNode = domNode;
    if (newNode instanceof HtmlNode) {
      applyAttributes(oldNode.attributes, newNode.attributes, domNode);
    }
    if (!(newNode instanceof TreeNode)) {
      // Start patching the new node if they are not components
      // If they are components, the connectedCallback function will take care of the rest
      patch(parent, null, newNode);
    }
    parent.domNode.replaceChild(domNode, oldNode.domNode);
  }

  // If the nodes are different, but of the same type
  if (!oldNode.diff(newNode)) {
    // Update the nodes
    updateNode(oldNode, newNode);
    if (oldNode instanceof TreeNode) {
      // If this node is a component, stop right here and update the component.
      // The component will take care of patching the children
      oldNode.domNode.update();
      return;
    }
  }

  // Proceed to update the children or replace them if needed
  const oldChildrenQueue = [...(oldNode && oldNode.children ? oldNode.children : [])].reverse();
  const newChildrenQueue = [...(newNode && newNode.children ? newNode.children : [])].reverse();
  let index = 0;
  // Loop in the old children until we have no more children
  while (oldChildrenQueue.length) {
    const oldChild = oldChildrenQueue.pop();
    // If there are no more new children
    if (!newChildrenQueue.length) {
      // We have to remove the remaining old children and break the loop
      oldNode.children.slice(index).forEach(child => {
        oldNode.domNode.removeChild(child.domNode);
      });
      oldNode.children = oldNode.children.slice(0, index);
      break;
    }

    index++;
    const newChild = newChildrenQueue.pop();

    // Start patching the two nodes
    patch(oldNode, oldChild, newChild);
  }

  // Loop in the new children if there are more
  while (newChildrenQueue.length) {
    const newChild = newChildrenQueue.pop();
    oldNode.children.push(newChild);

    // Generate the new node and append it to the dom
    const domNode = generateNode(newChild);
    newChild.domNode = domNode;
    if (newChild instanceof HtmlNode) {
      applyAttributes({}, newChild.attributes, domNode);
    }

    // Start patching the new node's children
    if (newChild.children) {
      newChild.children.forEach(child => patch(newChild, null, child));
    }
    oldNode.domNode.appendChild(domNode);
  }
};
