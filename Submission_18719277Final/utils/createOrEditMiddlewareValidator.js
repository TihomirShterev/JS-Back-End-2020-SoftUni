//TODO: editMiddlewareValidator
const { body } = require("express-validator");

module.exports = [
  // body("hotel", "Hotel name should not be empty").isLength({ min: 1 }), //
  body("hotel", "The hotel name should be at least 4 characters").isLength({ min: 4 }),
  body("city", "The city should be at least 3 characters long").isLength({ min: 3 }),
  body("freeRooms").custom(freeRoomsCheck),
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

function freeRoomsCheck(freeRooms) {
  if (freeRooms < 1 || 100 < freeRooms) {
    throw new Error("The number of free rooms should be between 1 and 100");
  }

  return true;
}
