const { homeController } = require("../controllers");
const { isAuthNeededMiddleware } = require("../utils");

module.exports = router => {
    // router.get("/", homeController.get.home);
  router.get("/", isAuthNeededMiddleware(false), homeController.get.home);

  return router;
};
