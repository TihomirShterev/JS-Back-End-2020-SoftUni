const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: process.env.PORT || 3001,
    dbUrl: "mongodb://localhost:27017/ItemsDB-JS-Back-End",
    cookie: "x-auth-token",
    secret: "SuperSecretSecret", // с него създаваме jwtToken-a
    saltRounds: 11
  }
};

module.exports = config[env];
