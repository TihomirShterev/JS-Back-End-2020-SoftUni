const { body } = require("express-validator");

// според мен няма смисъл в долните валидации, а е по-добре да има 1 обща валидация за несъвпадение на регистрираните с логнатите данни
module.exports = [
  body("password", "The password should be at least 5 characters").isLength({ min: 5 }), //
  body("password", "The password should consist only english letter and digits ").isAlphanumeric("en-US")
];
