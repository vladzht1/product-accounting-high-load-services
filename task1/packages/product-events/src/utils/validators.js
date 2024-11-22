import { productEventActions } from "../models/domain/actions.js";

/**
 * @param {string} action
 * @returns {boolean}
 */
export const isValidAction = (action) => {
  return Object.values(productEventActions).includes(action);
};
