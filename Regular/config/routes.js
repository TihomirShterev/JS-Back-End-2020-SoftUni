module.exports = (express, app) => {
  const routers = require("../routers")(express.Router()); // вземаме всички "подпътища" от routers/index.js (дори и да не напишем изрично index.js, ще го вземе по подразбиране)

  // допълваме главните пътища със съответните "подпътища"
  app.use("/home", routers.homeRouter);
  app.use("/user", routers.userRouter);
  app.use("/items", routers.itemRouter);
};
