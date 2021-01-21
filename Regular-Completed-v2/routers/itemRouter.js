const { itemController } = require("../controllers");
const { isAuthNeededMiddleware } = require("../utils");
const { createMiddlewareValidator } = require("../utils");

module.exports = router => {
  router.get("/", isAuthNeededMiddleware(), itemController.get.items);

  // router.get("/create", itemController.get.create);
  // router.get("/details/:itemId", itemController.get.details);
  // router.get("/edit/:itemId", itemController.get.edit);
  // router.get("/delete/:itemId", itemController.get.delete);

  // router.post("/create", itemController.post.create);
  // router.post("/edit/:itemId", itemController.post.edit);
  // router.get('/increment/:itemId', itemController.get.increment);

  router.get("/create", isAuthNeededMiddleware(), itemController.get.create);
  router.get("/details/:itemId", isAuthNeededMiddleware(), itemController.get.details);
  router.get("/edit/:itemId", isAuthNeededMiddleware(), itemController.get.edit);
  router.get("/delete/:itemId", isAuthNeededMiddleware(), itemController.get.delete);
  router.get("/increment/:itemId", isAuthNeededMiddleware(), itemController.get.increment);

  router.post("/create", isAuthNeededMiddleware(), createMiddlewareValidator, itemController.post.create);
  router.post("/edit/:itemId", isAuthNeededMiddleware(), itemController.post.edit);

  return router;
};
