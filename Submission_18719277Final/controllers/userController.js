const { User } = require("../models");
const { jwt, formValidator } = require("../utils");
const { cookie } = require("../config");

module.exports = {
  get: {
    login(req, res, next) {
      res.render("./user/login.hbs");
    },

    register(req, res, next) {
      res.render("./user/register.hbs");
    },
    profile(req, res, next) {
      // res.render("./user/profile.hbs");

      // console.log(req);
      const id = req.user._id.toString();
      let myItems = 0;
      let total = 0;

      User.findOne({ _id: id })
        .populate("itemsIncremented") // за да мога после да изчисля общата цена на всички items
        .lean()
        .then(user => {
          // console.log(user);
          user.itemsIncremented.forEach(item => {
            total += item.price;
          });
          res.render("./user/profile.hbs", { user, myItems, total });
        })
        .catch(next);
    },
    logout(req, res, next) {
      res.clearCookie(cookie).redirect("/");
    }
  },
  post: {
    register(req, res, next) {
      // console.log(req.body); // за да проверим:
      // // 1) дали bodyParser-ът работи, така че да можем да вземем информацията, която потребителят е въвел в input-полетата
      // // 2) дали контролерът и рутерът работят

      // // тестваме създаване на потребител
      // User.create()
      //   .then(createdUser => {
      //     console.log(createdUser);
      //   })
      //   .catch(e => console.log(e));

      const formValidations = formValidator(req);

      if (!formValidations.isOk) {
        // показваме същата страница на потребителя със старите данни и грешката
        res.render("./user/register.hbs", formValidations.contextOptions);
        return;
      }

      const { email, username, password } = { ...req.body };

      User.findOne({ username })
        .then(user => {
          if (user) {
            throw new Error("The given username is already in use...");
          }
          console.log(user); // за дебъг
          return User.create({ email, username, password });
        })
        .then(user => {
          // console.log(user.toString()); // за да видим данните на създадения потребител

          const token = jwt.createToken(user._id);

          res
            .status(200)
            .cookie(cookie, token, { maxAge: 3600000 }) //
            .redirect("/");
        })
        .catch(e => {
          console.log(e);
          res.redirect("/register");
        });
    },

    login(req, res, next) {
      // console.log(req.body);
      const formValidations = formValidator(req);

      if (!formValidations.isOk) {
        // показваме същата страница на потребителя със старите данни и грешката
        res.render("./user/login.hbs", formValidations.contextOptions);
        return;
      }

      const { username, password } = req.body;

      User.findOne({ username })
        .then(user => {
          return Promise.all([user.comparePasswords(password), user]);
        })
        .then(([isPasswordsMatched, user]) => {
          if (!isPasswordsMatched) {
            throw new Error("The provided password does not match.");
          }

          const token = jwt.createToken(user._id);

          res
            .status(200)
            .cookie(cookie, token, { maxAge: 3600000 }) //
            .redirect("/");
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
