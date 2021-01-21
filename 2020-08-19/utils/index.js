const jwt = require("./jwt");

const authMiddleware = require("./authMiddleware");
const registerMiddlewareValidator = require("./registerMiddlewareValidator");
const loginMiddlewareValidator = require("./loginMiddlewareValidator");
const isAuthNeededMiddleware = require("./isAuthNeededMiddleware");

const formValidator = require("./formValidator");

module.exports = {
  jwt,
  authMiddleware,
  registerMiddlewareValidator,
  loginMiddlewareValidator,
  formValidator,
  isAuthNeededMiddleware
};
