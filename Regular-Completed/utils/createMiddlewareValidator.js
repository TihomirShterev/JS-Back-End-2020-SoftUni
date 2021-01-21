const { body } = require("express-validator");

module.exports = [
  // body("title", "Title should not be empty").isLength({ min: 1 }), //
  body("title", "The title should be at least 4 characters").isLength({ min: 4 }),
  body("description", "The description should be at least 20 characters long").isLength({ min: 20 }),
  body("imageUrl").custom(imageUrlCheck)
];

function imageUrlCheck(imageUrl) {
  const checkHttp = imageUrl.substring(0, 4);
  const checkHttps = imageUrl.substring(0, 5);

  if (checkHttp !== "http" || checkHttps !== "https") {
    throw new Error("The imageUrl should start with http or https");
  }

  return true;
}
