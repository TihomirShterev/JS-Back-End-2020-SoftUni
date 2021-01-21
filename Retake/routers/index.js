const routers = [
  { homeRouter: require("./homeRouter") },
  { userRouter: require("./userRouter") },
  { itemRouter: require("./itemRouter") } //
];

// закачаме "подпътищата" върху обекта router и го експортваме, за да го използваме в config/routes
module.exports = router => {
  return routers.reduce((acc, curr) => {
    const key = Object.keys(curr)[0]; // key е текущия рутер
    return Object.assign(acc, { [key]: curr[key](router) });
  }, {});
};
