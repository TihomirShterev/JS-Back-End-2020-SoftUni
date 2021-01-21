module.exports = {
  get: {
    home(req, res, next) {
      // res.render("./home/home.hbs", { age: 5 }); // { age: 5 } само за да тестваме в началото дали сървърът работи
      res.render("./home/home.hbs");
    }
  }
};
