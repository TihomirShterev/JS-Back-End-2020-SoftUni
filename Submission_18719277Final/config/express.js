const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const { authMiddleware } = require("../utils");

module.exports = (express, app) => {
  app.use(express.static("static")); // внимание с името на папката от ресурсите!!! тук сетваме middleware-a, който обработва статичните файлове
  // app.use(express.static("public")); 
  app.use(express.json()); // за да получаваме информацията от формите в json формат
  app.use(express.urlencoded({ extended: false })); // за да достъпваме информацията в body-то с req.body

  app.use(cookieParser()); // за да достъпваме cookie-тата

  app.use(authMiddleware); // важно е да е между cookieParser-a и engine-a

  // сетваме си Handlebars
  app.engine(
    "hbs",
    handlebars({
      layoutsDir: "views", // указваме папката, в която да се търси .hbs файла, който да ще се рендерира
      defaultLayout: "base-layout.hbs", // ще се използва във всички views
      partialsDir: "views/partials",
      extname: "hbs",
      helpers: require('./handlebars-helpers')
    })
  );
  app.set("viewengine", "hbs");
};
