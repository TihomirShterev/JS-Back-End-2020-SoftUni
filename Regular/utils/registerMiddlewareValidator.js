const { body } = require("express-validator");

module.exports = [
  // body("username", "The provided username is not valid").isEmail(), // Може би ще трябва да сменя isEmail
  body("password", "The password should be at least 5 characters").isLength({ min: 5 }),
  body("repeatPassword").custom(customRepeatPasswordCheck)
];

// правим си custom валидация, защото в случая не можем да ползваме наготово
function customRepeatPasswordCheck(repeatPassword, { req }) {
  if (repeatPassword !== req.body.password) {
    throw new Error("Repeat password does not match password");
  }

  return true;
}
