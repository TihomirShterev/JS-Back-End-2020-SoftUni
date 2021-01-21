const { Item } = require("../models");
// const { Item, User } = require("../models");

module.exports = {
  get: {
    home(req, res, next) {
      // проверяваме дали потребителят е логнат
      // (по този начин си спестяваме писаното на отделни ф-ии (get.guest и get.loggedIn) и добавянето на isAuthNeededMiddleware в homeRouter.js)
      if (req.user) {
        // res.render("./home/loggedIn.hbs"); // да го закоментирам или изтрия само ако в задачата се изисква търсене на item
        Item.find({}) // find({}), за да вземем всички записи в базата
          .lean()
          .then(items => {
            // console.log(items);
            res.render("./home/loggedIn.hbs", {
              items
            }); // { items } - така закачаме масива с items за контекста.
          })
          .catch(e => console.log(e));

        return;
      }
      // // res.render("./home/guest.hbs");

      Item.find({}) // find({}), за да вземем всички записи в базата
        .lean()
        .sort({ freeRooms: -1 })
        // // .sort({ peopleWhoIncremented: "desc" }) // втори вариант
        .limit(3) // за да покажем само първите 3 items според критерия на сортирането
        .then(items => {
          // console.log(items);
          res.render("./home/guest.hbs", {
            items
          }); // { items } - така закачаме масива с items за контекста.
        })
        .catch(e => console.log(e));
      /**/
    }
  }
};
