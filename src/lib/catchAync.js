/**
 * used for catching async errors
 * @param {(req, res, next)} fn  async function
 */

module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
