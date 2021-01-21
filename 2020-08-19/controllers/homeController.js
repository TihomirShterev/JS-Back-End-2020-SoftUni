const { Item } = require("../models");

module.exports = {
  get: {
    home(req, res, next) {
      if (req.user) {
        // res.render("./home/loggedIn.hbs");
        Item.find({}) // find({}), за да вземем всички записи в базата
          .lean()
          .sort({ peopleWhoIncremented: -1 })
          // .sort({ peopleWhoIncremented: "desc" }) // втори вариант
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
      res.render("./home/guest.hbs");
    }
  }
};
