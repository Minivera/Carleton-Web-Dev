import { HtmlNode } from '../nodes/htmlNode';
import { TreeNode } from '../nodes/treeNode';
import { applyAttributes, updateNode, generateNode } from './utils';

/**
 * Main diffing algorithm that will diff nodes and patch them in place, generating DOM mutations alongside virtual DOM
 * mutations. Will use iteration to patch the tree without calling more functions.
 * @todo Improve performance
 * @param {HtmlNode|TextNode|TreeNode} parent - The parent of the old and new node. Used to add or remove children.
 * @param {HtmlNode|TextNode|TreeNode} oldNode - The node from the tree that is being patched. Is modified by the
 * algorithm.
 * @param {HtmlNode|TextNode|TreeNode} newNode - The node from the new tree used to patch the old tree.
 * @export
 */
export const patch = (parent, oldNode, newNode) => {
  if (!newNode && oldNode) {
    // If new node is null, but not the old node, then we have nothing to render, clear the previous node.
    parent.domNode.removeChild(oldNode.domNode);
    parent.children = [];
    oldNode = null;
    return;
  }
  if (!newNode && !oldNode) {
    // If both are null, do nothing
    return;
  }

  const createQueueItem = parent => child => ({ parent, child, toDelete: false, toAdd: false });

  const oldChildrenQueue = [];
  let newChildrenQueue = [];

  if (oldNode) {
    // If the old node exists, add both node to be updated
    oldChildrenQueue.push({
      parent,
      child: oldNode,
      toDelete: false,
      toAdd: false,
    });
    newChildrenQueue.push({
      parent,
      child: newNode,
      toDelete: false,
      toAdd: false,
    });
  } else {
    // Otherwise, add the new node to be added
    newChildrenQueue.push({
      parent,
      child: newNode,
      toDelete: false,
      toAdd: true,
    });
  }

  let oldIndex = 0;
  let newIndex = 0;
  while (oldIndex < oldChildrenQueue.length || newIndex < newChildrenQueue.length) {
    const oldQueueItem = oldChildrenQueue[oldIndex];
    const newQueueItem = newChildrenQueue[newIndex];

    if (newQueueItem && newQueueItem.toAdd) {
      // If we have to add this node, start doing so
      const currentNew = newQueueItem.child;
      const currentParent = newQueueItem.parent;

      // Do not add the child to the virtual node if it is already there, like when mounting
      if (!currentParent.children.find(el => el === currentNew)) {
        currentParent.children.push(currentNew);
      }

      // Generate the new node and append it to the dom
      const domNode = generateNode(currentNew);
      currentNew.domNode = domNode;
      if (currentNew instanceof HtmlNode) {
        applyAttributes({}, currentNew.attributes, domNode);
        // If the new node was an HTML node, then we also need to set its children to be added
        newChildrenQueue = newChildrenQueue.concat(currentNew.children.map(child => {
          const newItem = createQueueItem(currentNew)(child);
          newItem.toAdd = true;
          return newItem;
        }));
      }

      currentParent.domNode.appendChild(domNode);
      newIndex++;
    } else if (oldQueueItem && oldQueueItem.toDelete) {
      // If we have to delete this node, start doing so
      const currentOld = oldQueueItem.child;
      const currentParent = oldQueueItem.parent;

      currentParent.children = currentParent.children.filter(el => el !== currentOld);
      currentParent.domNode.removeChild(currentOld.domNode);
      oldIndex++;
    } else if (!oldQueueItem.toDelete && !newQueueItem.toAdd) {
      // If none of the node are set to be added or deleted
      // Then we can safely diff and add the children to the queue
      let currentOld = oldQueueItem.child;
      const currentNew = newQueueItem.child;
      const currentParent = oldQueueItem.parent;

      // If the two nodes don't have the same type
      if (currentOld.prototype !== currentNew.prototype) {
        // Replace the old child with the new child
        currentParent.children = currentParent.children.map(child => {
          if (child === currentOld) {
            return currentNew;
          }
          return child;
        });
        const domNode = generateNode(currentNew);
        currentNew.domNode = domNode;
        if (currentNew instanceof HtmlNode) {
          applyAttributes(currentOld.attributes, currentNew.attributes, domNode);
        }
        currentParent.domNode.replaceChild(domNode, currentOld.domNode);
        currentOld = currentNew;
      }

      if (currentOld instanceof HtmlNode && currentNew instanceof HtmlNode) {
        // If both nodes are HTML nodes, compare their children length
        let count = 0;
        for (; count < currentOld.children.length; count++) {
          // Loop over the old children, if we have no new children, set to delete
          if (count >= currentNew.children.length) {
            const newItem = createQueueItem(currentOld)(currentOld.children[count]);
            newItem.toDelete = true;
            oldChildrenQueue.push(newItem);
            continue;
          }

          oldChildrenQueue.push(createQueueItem(currentOld)(currentOld.children[count]));
          newChildrenQueue.push(createQueueItem(currentOld)(currentNew.children[count]));
        }

        // Then see if we have any new children left
        for (; count < currentNew.children.length; count++) {
          const newItem = createQueueItem(currentOld)(currentNew.children[count]);
          newItem.toAdd = true;
          newChildrenQueue.push(newItem);
        }
      } else if (currentNew instanceof HtmlNode) {
        // If the new node was an HTML node, then we know the oldNode was of a different type
        // and we need to add all children
        newChildrenQueue = newChildrenQueue.concat(currentNew.children.map(child => {
          const newItem = createQueueItem(currentOld)(child);
          newItem.toAdd = true;
          return newItem;
        }));
      }

      // If the nodes are different, but of the same type
      if (!currentOld.diff(currentNew)) {
        // Update the nodes
        updateNode(currentOld, currentNew);
        if (currentOld instanceof TreeNode) {
          // If this node is a component, stop right here and update the component.
          // The component will take care of patching the children
          currentOld.domNode.update();
          continue;
        }
      }

      oldIndex++;
      newIndex++;
    }
  }
};
