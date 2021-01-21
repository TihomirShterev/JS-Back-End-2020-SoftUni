//  информацията от формуляра подаваме тук, за да бъде запазена на ниво база данни

const { saltRounds } = require("../config");

// module.exports = mongoose => {
module.exports = (mongoose, bcrypt) => {
  const { Schema, model: Model } = mongoose;
  const { String, ObjectId } = Schema.Types;

  const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    itemsIncremented: [
      {
        type: ObjectId,
        ref: "Item"
      }
    ],
    myItems: [
      {
        type: ObjectId,
        ref: "Item"
      }
    ]
  });

  userSchema.methods = {
    comparePasswords(password) {
      return bcrypt.compare(password, this.password); // сравняваме текущата със запазената парола
    }
  };

  userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
      next();
      return;
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        next(err); // ако нещо се счупи, ще извикаме следващата ф-я по веригата,
        // като ѝ подадем грешката, така че да можем да я обработим там, където се създава юзъра
        // в случая в userController.js -> post.register -> .catch
        return;
      }
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          next(err);
          return;
        }
        this.password = hash; // презаписваме паролата на потребителя с текущия хеш
        next(); // за да отидем в следващата ф-я
      });
    });
  });
  /**/

  return Model("User", userSchema);
};
