const { Item, User } = require("../models");

module.exports = {
  get: {
    create(req, res, next) {
      res.render("./items/create.hbs");
    },
    details(req, res, next) {
      // res.render("./items/details.hbs");

      // console.log(itemId);
      // console.log(req.user._id);
      // Item.findOne({ _id: req.params.itemId })
      // .lean()
      // .then(item => {
      //   // console.log(item);
      //   res.render("./items/details.hbs", { ...item });
      // });

      // създаваме си помощни променливи
      let itemId = req.params.itemId;
      let isCreator = false;
      let isAlreadyIncremented = false;
      // console.log(req.user._id);
      let userId = req.user._id.toString(); // toString(), защото иначе ни връща обект
      let peopleWhoIncremented = 0;

      Item.findOne({ _id: itemId })
        .lean()
        .then(item => {
          item.creatorId.toString() === userId ? (isCreator = true) : (isCreator = false);
          if (item.peopleWhoIncremented) {
            peopleWhoIncremented = item.peopleWhoIncremented.length;
            // console.log(item.peopleWhoIncremented.toString());
            if (item.peopleWhoIncremented.toString().includes(userId)) {
              isAlreadyIncremented = true;
            }
          }
          res.render("./items/details.hbs", { ...item, isCreator, isAlreadyIncremented, peopleWhoIncremented });
        })

        .catch(next);
    },

    edit(req, res, next) {
      // res.render("./items/edit.hbs");
      
      Item.findOne({ _id: req.params.itemId }) //
        .then(item => {
          res.render("./items/edit.hbs", item); // закачаме текущия item за контекста
        });
    },
    delete(req, res, next) {
      Item.deleteOne({ _id: req.params.itemId }) //
        .then(result => {
          res.redirect("/");
        });
    },
    increment(req, res, next) {
      // console.log(req.params.itemId);
      let itemId = req.params.itemId;
      // console.log(req.user._id.toString());
      let userId = req.user._id.toString();
      Promise.all([
        Item.updateOne({ _id: itemId }, { $push: { peopleWhoIncremented: userId } }), //
        User.updateOne({ _id: userId }, { $push: { itemsIncremented: itemId } })
      ])
        .then(() => {
          res.redirect(`/details/${itemId}`);
        })
        .catch(next);
    }
  },
  post: {
    create(req, res, next) {
      // console.log(req.body);
      // Item.create({ ...req.body, creatorId: req.user._id }) //
      //   .then(createdItem => {
      //     // console.log(createdItem.toString());
      //     res.redirect("/");
      //   });

      const userId = req.user._id.toString();
      Promise.all([
        Item.create({ ...req.body, creatorId: userId }), //
        User.updateOne({ _id: userId }, { $inc: { myItems: 1 } })
      ])
        .then(() => {
          res.redirect("/");
        })
        .catch(next);
    },

    edit(req, res, next) {
      // console.log(req.params.itemId);
      // console.log(req.body);
      const { itemId } = req.params;

      Item.updateOne(
        { _id: itemId },
        { $set: { ...req.body } } // $set значи, че искаме да сетнем нови параметри на req.body
      ).then(updatedItem => {
        res.redirect(`/details/${itemId}`);
      });
    }
  }
};
