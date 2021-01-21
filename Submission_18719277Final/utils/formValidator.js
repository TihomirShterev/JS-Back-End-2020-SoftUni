const { validationResult } = require("express-validator");

module.exports = req => {
  const errors = validationResult(req);
  // странно, но oldInput не работи в edit формуляра
  if (!errors.isEmpty()) {
    return {
      contextOptions: {
        oldInput: {
          ...req.body
        },
        message: `${errors.array()[0].msg}` // за да покажем на потребителя първата допусната грешка
      },
      isOk: false // сигнализираме на контролера, че нещо не е окей
    };
  }

  return { isOk: true }; // ако масивът с грешки е празен, т.е. потребителят е въвел правилно данните
};
