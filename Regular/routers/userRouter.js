const { userController } = require("../controllers");
const {
  registerMiddlewareValidator, //
  loginMiddlewareValidator,
  isAuthNeededMiddleware
} = require("../utils");

module.exports = router => {
  // router.get("/login", userController.get.login);
  // router.get("/register", userController.get.register);
  // // router.get("/profile", userController.get.profile);
  // router.get("/logout", userController.get.logout);

  // router.post("/register", userController.post.register);
  // router.post("/login", userController.post.login);
  // // router.post("/register", registerMiddlewareValidator, userController.post.register);
  // // router.post("/login", loginMiddlewareValidator, userController.post.login);

  router.get("/login", isAuthNeededMiddleware(false), userController.get.login);
  router.get("/register", isAuthNeededMiddleware(false), userController.get.register);
  // router.get("/profile", isAuthNeededMiddleware(), userController.get.profile);
  router.get("/logout", isAuthNeededMiddleware(true), userController.get.logout);

  router.post(
    "/register", //
    isAuthNeededMiddleware(false),
    registerMiddlewareValidator,
    userController.post.register
  );
  router.post(
    "/login",
    isAuthNeededMiddleware(false), //
    loginMiddlewareValidator,
    userController.post.login
  );
  /**/
  return router;
};
