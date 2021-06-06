const jwt = require("jsonwebtoken");

const requiredAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "mukesh Secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log("decodedToken ::: ", decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  requiredAuth,
};
