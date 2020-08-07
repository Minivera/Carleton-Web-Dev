import { HtmlNode } from '../nodes/htmlNode';
import { TreeNode } from '../nodes/treeNode';
import { applyAttributes, updateNode, generateNode } from './utils';

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
    parent.domNode.replaceChild(domNode, oldNode.domNode);
  } else if (!oldNode.diff(newNode)) {
    // If the nodes are different, but of the same type, update the nodes
    updateNode(oldNode, newNode);
    if (oldNode instanceof TreeNode) {
      // If this node is a component, stop right here and update the component.
      // The component will take care of patching the children
      oldNode.domNode.update();
      return;
    }
  }

  // Proceed to update the children or replace them if needed
  let index = 0;
  // Loop in the old children until we have no more children
  for (; oldNode.children && index < oldNode.children.length; index++) {
    const oldChild = oldNode.children[index];

    // If there are no more new children
    if (index >= newNode.children.length) {
      // We have to remove the remaining old children and break the loop
      oldNode.children.splice(index).forEach(child => {
        oldNode.domNode.removeChild(child.domNode);
      });
      break;
    }

    const newChild = newNode.children[index];

    // Start patching the two nodes
    patch(oldNode, oldChild, newChild);
  }

  // Loop in the new children if there are more
  for (; newNode.children && index < newNode.children.length; index++) {
    const newChild = newNode.children[index];
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
