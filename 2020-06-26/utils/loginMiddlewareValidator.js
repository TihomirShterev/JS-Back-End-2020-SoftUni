const { body } = require("express-validator");

// според мен няма смисъл в долните валидации, а е по-добре да има 1 обща валидация за несъвпадение на регистрираните с логнатите данни
module.exports = [
  body("username", "The username should be at least 3 characters ").isLength({ min: 3 }),
  body("username", "The username should consist only english letter and digits ").isAlphanumeric("en-US"),
  body("password", "The password should be at least 3 characters").isLength({ min: 3 }),
  body("password", "The password should consist only english letter and digits ").isAlphanumeric("en-US")
];
