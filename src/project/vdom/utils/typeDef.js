/**
 * @callback functionComponent
 * @param {Object} props - The properties and children of this component.
 * @param {Object} context - The state and function to set the state for this component.
 * @property {function(Object): Object} contextCreator - Function that is to be executed when applying the
 * context on a component.
 * @property {Object[]} contextObjects - Array of objects that are applied to the context. Those are only set when the
 * component is first created through the factory.
 * @returns {TreeNode|TextNode|HtmlNode}
 */

/**
 * Object used to store and apply context on components. Context is a data store that can hook into lifecycle methods
 * of components and provide data that will then be passed to the factory.
 * @typedef contextObject
 * @property {function(Object): Object} apply - Apply function that will be executed when context is
 * generated. It receives the previous context and updates it with the new context. Apply functions will be
 * chained together to generate the final context object.
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
