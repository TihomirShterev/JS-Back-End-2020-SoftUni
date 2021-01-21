const { body } = require("express-validator");

module.exports = [
  // body("username", "The provided username is not valid").isEmail(), // Може би ще трябва да сменя isEmail
  body("password", "The password should be at least 5 characters").isLength({ min: 5 })
];