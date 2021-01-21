// index.js ни е стартовата точка
// тук ще require-ваме(импортваме) всички файлове, за да експортнем index.js във външния свят

const express = require("express");
const { port } = require("./config");

const app = express(); // създаваме си инстанция на сървъра
const appString = `Server is ready, listening on port: ${port}...`;

require("./config/database")()
  .then(() => {
    // сетъпваме си конфигурационните middleware-и
    require("./config/express")(express, app);
    require("./config/routes")(express, app);

    app.listen(port, console.log(appString));
  })
  .catch(e => console.log(e));
