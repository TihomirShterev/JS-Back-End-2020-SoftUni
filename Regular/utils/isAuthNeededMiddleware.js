// от тук ще връщаме дали текущия път може да бъде достъпен само за логнати потребители (или само за гости)

module.exports = (isAuthNeeded = true) => {
  return (req, res, next) => {
    const isNotAuthWhenIsNeeded = !req.user && isAuthNeeded;
    const isAuthWhenIsNotNeeded = req.user && !isAuthNeeded;

    if (isNotAuthWhenIsNeeded || isAuthWhenIsNotNeeded) {
      const redirectPage = isNotAuthWhenIsNeeded ? "/user/login" : "/items/all";
      res.redirect(redirectPage);
      return;
    }

    next();
  };
};
