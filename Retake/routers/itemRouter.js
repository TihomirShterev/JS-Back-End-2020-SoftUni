const { itemController } = require("../controllers");
const { isAuthNeededMiddleware, createMiddlewareValidator } = require("../utils");

module.exports = router => {
  // router.get("/create", itemController.get.create);
  // router.get("/details", itemController.get.details);
  // router.get("/edit", itemController.get.edit);

  // router.get("/details/:itemId", itemController.get.details);
  // router.get("/edit/:itemId", itemController.get.edit);
  // router.get("/delete/:itemId", itemController.get.delete);

  // router.post("/create", createMiddlewareValidator, itemController.post.create);
  // router.post("/edit/:itemId", itemController.post.edit);

  // router.get("/increment/:itemId", itemController.get.increment);

  router.get("/create", isAuthNeededMiddleware(), itemController.get.create);
  router.get("/details/:itemId", isAuthNeededMiddleware(), itemController.get.details);
  router.get("/edit/:itemId", isAuthNeededMiddleware(), itemController.get.edit);
  router.get("/delete/:itemId", isAuthNeededMiddleware(), itemController.get.delete);

  router.post("/create", isAuthNeededMiddleware(), createMiddlewareValidator, itemController.post.create);
  router.post("/edit/:itemId", isAuthNeededMiddleware(), itemController.post.edit);

  router.get("/increment/:itemId", isAuthNeededMiddleware(), itemController.get.increment);
  /**/
  return router;
};
