const { homeController } = require("../controllers");
const { isAuthNeededMiddleware } = require("../utils");

module.exports = router => {
  router.get("/home", isAuthNeededMiddleware(false), homeController.get.home);

  return router;
};
