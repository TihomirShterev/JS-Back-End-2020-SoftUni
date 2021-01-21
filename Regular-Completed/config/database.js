// тук си сетъпваме базата

const mongoose = require("mongoose");
const dbConnectionString = require("./").dbUrl;

// този обект не е нужен, но за да не излизат някакви deprecated неща,
// така че като стартираме сървъра, конзолата да е чиста
const dbConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

module.exports = () => {
  return mongoose.connect(dbConnectionString, dbConnectionOptions);
};
