const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: process.env.PORT || 9999,
    dbUrl: "mongodb://localhost:27017/ItemsDB",
    cookie: "x-auth-token",
    secret: "SuperSecretSecret", // с него създаваме jwtToken-a
    saltRounds: 11
  }
};

module.exports = config[env];
