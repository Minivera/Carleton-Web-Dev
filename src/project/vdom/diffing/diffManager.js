import { patch as recursivePatch } from './patchRecursive';
import { patch as iterativePatch } from './patchIterative';
import { patch as separatedPatch } from './patchDiffSeparated';

let diffFunction = recursivePatch;

/**
 * Switches the current diffing function to the recursive diff function.
 */
export const useRecursiveDiffer = () => { diffFunction = recursivePatch; };

/**
 * Switches the current diffing function to the iterative diff function.
 */
export const useIterativeDiffer = () => { diffFunction = iterativePatch; };

/**
 * Switches the current diffing function to the separate diff and patch function.
 */
export const useSeparatedDiffer = () => { diffFunction = separatedPatch; };

/**
 * Pass-through diffing function that will trigger the chosen diffing algorithm. All algorithms should take the same
 * arguments and hve the same side effects once executed.
 * @param {HtmlNode|TextNode|TreeNode} parent - The parent of the old and new node. Used to add or remove children.
 * @param {HtmlNode|TextNode|TreeNode} oldNode - The node from the tree that is being patched. Is modified by the
 * algorithm.
 * @param {HtmlNode|TextNode|TreeNode} newNode - The node from the new tree used to patch the old tree.
 * @export
 */
export const patch = (parent, oldNode, newNode) => diffFunction(parent, oldNode, newNode);
