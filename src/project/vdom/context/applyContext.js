import '../utils/typeDef';

/**
 * Function that augments the received component to add the functionalities to basic function components.
 * Context is added as the second argument on the component factory functions and their values are stored
 * on the component for as long as it is loaded into the DOM.
 * @param {contextObject} contextObj - Object that contains the context to apply on the component.
 * @param {functionComponent} component - Component on which to add the context.
 * @return {functionComponent} Augmented component with context added.
 */
export const applyContext = (contextObj, component) => {
  if (!Object.prototype.hasOwnProperty.call(contextObj, 'apply')) {
    throw new Error(
      'Context object must expose an `apply` method that takes the previous context as their only argument and ' +
      'return the updated context.'
    );
  }

  // Add the context to the function component
  const previousCreator = component.contextCreator;
  if (previousCreator) {
    // If there was a previous context applied to the component, chain them together.
    component.contextCreator = context => contextObj.apply(previousCreator(context));
  } else {
    // Otherwise, create the context creator from the apply function
    component.contextCreator = contextObj.apply.bind(contextObj);
  }

  // Return the augmented component
  return component;
};
