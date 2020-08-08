import { HtmlNode } from '../nodes/htmlNode';
import { TreeNode } from '../nodes/treeNode';
import { applyAttributes, updateNode, generateNode } from './utils';

class UpdatePatch {
  constructor(oldNode, newNode) {
    this.oldNode = oldNode;
    this.newNode = newNode;
  }

  execute() {
    // Update the nodes
    updateNode(this.oldNode, this.newNode);
    if (this.oldNode instanceof TreeNode) {
      // If this node is a component, stop right here and update the component.
      // The component will take care of patching the children
      this.oldNode.domNode.update();
    }
  }
}

class ReplacePatch {
  constructor(parent, oldNode, newNode) {
    this.parent = parent;
    this.oldNode = oldNode;
    this.newNode = newNode;
  }

  execute() {
    // Replace the old child with the new child
    this.parent.children = this.parent.children.map(child => {
      if (child === this.oldNode) {
        return this.newNode;
      }
      return child;
    });
    const domNode = generateNode(this.newNode);
    this.newNode.domNode = domNode;
    if (this.newNode instanceof HtmlNode) {
      applyAttributes(this.oldNode.attributes, this.newNode.attributes, domNode);
    }
    this.parent.domNode.replaceChild(domNode, this.oldNode.domNode);
  }
}

class InsertPatch {
  constructor(parent, newNode) {
    this.parent = parent;
    this.newNode = newNode;
  }

  execute() {
    if (!this.parent.children.find(el => el === this.newNode)) {
      this.parent.children.push(this.newNode);
    }

    // Generate the new node and append it to the dom
    const domNode = generateNode(this.newNode);
    this.newNode.domNode = domNode;
    if (this.newNode instanceof HtmlNode) {
      applyAttributes({}, this.newNode.attributes, domNode);
    }

    this.parent.domNode.appendChild(domNode);
  }
}

class DeletePatch {
  constructor(parent, oldNode) {
    this.parent = parent;
    this.oldNode = oldNode;
  }

  execute() {
    this.parent.children = this.parent.children.filter(el => el !== this.oldNode);
    this.parent.domNode.removeChild(this.oldNode.domNode);
  }
}

export const diff = (parent, oldNode, newNode) => {
  let patches = [];

  if (!newNode) {
    // If a null or undefined should get here, ignore it.
    return patches;
  }

  // If Old node does not exists, then we are mounting for the first time
  if (!oldNode) {
    // Generate an insert patch
    patches.push(new InsertPatch(parent, newNode));

    // Start diffing on the new node's children
    if (newNode instanceof HtmlNode) {
      newNode.children.forEach(child => {
        patches.push(...diff(newNode, null, child));
      });
    }
    return patches;
  }

  // If the two nodes don't have the same type
  if (oldNode.prototype !== newNode.prototype) {
    // Generate a replace patch
    patches.push(new ReplacePatch(parent, oldNode, newNode));
  } else if (!oldNode.diff(newNode)) {
    // If the nodes are different, but of the same type, update the nodes
    patches.push(new UpdatePatch(oldNode, newNode));
  }

  // Proceed to update the children or replace them if needed
  let index = 0;
  // Loop in the old children until we have no more children
  if (oldNode instanceof HtmlNode) {
    for (; index < oldNode.children.length; index++) {
      const oldChild = oldNode.children[index];

      // If there are no more new children
      if (index >= newNode.children.length) {
        // We have to remove the remaining old children and break the loop
        patches.push(new DeletePatch(oldNode, oldChild));
        continue;
      }

      const newChild = newNode.children[index];

      // Start patching the two nodes
      patches.push(...diff(oldNode, oldChild, newChild));
    }

    // Loop in the new children if there are more
    for (; index < newNode.children.length; index++) {
      const newChild = newNode.children[index];
      patches.push(new InsertPatch(oldNode, newChild));

      // Start diffing the new node's children
      if (newChild.children) {
        newChild.children.forEach(child => {
          patches.push(...diff(newChild, null, child));
        });
      }
    }
  }

  return patches;
};

/**
 * Main diffing algorithm that will diff nodes and patch them in a separate process, generating DOM mutations
 * alongside virtual DOM mutations. Will be recursively called on all the nodes in the tree until the entire tree
 * has been examined, then patches will be executed.
 * @todo Improve performance
 * @param {HtmlNode|TextNode|TreeNode} parent - The parent of the old and new node. Used to add or remove children.
 * @param {HtmlNode|TextNode|TreeNode} oldNode - The node from the tree that is being patched. Is modified by the
 * algorithm.
 * @param {HtmlNode|TextNode|TreeNode} newNode - The node from the new tree used to patch the old tree.
 * @export
 */
export const patch = (parent, oldNode, newNode) => {
  const patches = diff(parent, oldNode, newNode);
  patches.forEach(patch => patch.execute());
};
