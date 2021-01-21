const { Item, User } = require("../models");

module.exports = {
  get: {
    home(req, res, next) {
      // проверяваме дали потребителят е логнат 
      // (по този начин си спестяваме писаното на отделни ф-ии (get.guest и get.loggedIn) и добавянето на isAuthNeededMiddleware в homeRouter.js)
      if (req.user) { 
      // res.render("./home/loggedIn.hbs"); // да го закоментирам или изтрия, когато разкоментирам долната част

      // търсене на item, разкоментирам само ако се изисква в задачата
      let search = {};
      if (req.query.search) {
        let searchArgs = req.query.search;
        // console.log(searchArgs);
        search = { title: { $regex: new RegExp(searchArgs, "i") } };
      }

      Item.find(search)
        // Item.find({}) // find({}), за да вземем всички записи в базата
        .lean()
        .sort({ createdAt: "asc" })
        // .sort({ peopleWhoIncremented: -1 })
        // // .sort({ peopleWhoIncremented: "desc" }) // втори вариант
        .then(items => {
          // console.log(items);
          res.render("./home/loggedIn.hbs", {
            items
          }); // { items } - така закачаме масива с items за контекста.
        })
        .catch(e => console.log(e));

      return;
      }
      // res.render("./home/guest.hbs", { age: 5 }); // { age: 5 } само за да тестваме в началото дали сървърът работи
      // res.render("./home/guest.hbs");

      Item.find({}) // find({}), за да вземем всички записи в базата
        .lean()
        .sort({ peopleWhoIncremented: -1 })
        // .sort({ peopleWhoIncremented: "desc" }) // втори вариант
        .limit(3) // за да покажем само първите 3 items според критерия на сортирането
        .then(items => {
          // console.log(items);
          res.render("./home/guest.hbs", {
            items
          }); // { items } - така закачаме масива с items за контекста.
        })
        .catch(e => console.log(e));
    }
  }
};
