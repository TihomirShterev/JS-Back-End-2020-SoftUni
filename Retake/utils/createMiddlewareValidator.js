const { body } = require("express-validator");

module.exports = [
  // body("hotel", "Hotel name should not be empty").isLength({ min: 1 }), //
  body("hotel", "The hotel name should be at least 4 characters").isLength({ min: 4 }),
  body("city", "The city should be at least 20 characters long").isLength({ min: 3 }),
  body("imgUrl").custom(imgUrlCheck)
];

function imgUrlCheck(imgUrl) {
  const checkHttp = imgUrl.substring(0, 4);
  const checkHttps = imgUrl.substring(0, 5);

  if (checkHttp !== "http" || checkHttps !== "https") {
    throw new Error("The imageUrl should start with http or https");
  }

  return true;
}
