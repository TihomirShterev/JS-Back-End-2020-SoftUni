const { body } = require("express-validator");

module.exports = [
  body("email", "The provided email is not valid").isEmail(), //
  body("password", "The password should be at least 5 characters").isLength({ min: 5 }),
  body("password", "The password should consist only english letter and digits ").isAlphanumeric("en-US"),
  body("rePassword").custom(customRePasswordCheck)
];

// правим си custom валидация, защото в случая не можем да ползваме наготово
function customRePasswordCheck(rePassword, { req }) {
  if (rePassword !== req.body.password) {
    throw new Error("Repeat password does not match password");
  }

  return true;
}
