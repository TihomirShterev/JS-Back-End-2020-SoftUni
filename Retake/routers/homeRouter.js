const { homeController } = require("../controllers");
// const { isAuthNeededMiddleware } = require("../utils");

module.exports = router => {
  router.get("/", homeController.get.home);
  // router.get("/guest", isAuthNeededMiddleware(false), homeController.get.guest); // втори начин - в 2 ф-ии вместо в една и с изискване за authentication
  // router.get("/loggedIn", isAuthNeededMiddleware(), homeController.get.loggedIn);

  return router;
};
