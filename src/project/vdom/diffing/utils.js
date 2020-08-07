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
export const applyAttributes = (oldAttributes = {}, newAttributes = {}, node) => {
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
export const generateNode = virtualNode => {
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
export const updateNode = (oldNode, newNode) => {
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
