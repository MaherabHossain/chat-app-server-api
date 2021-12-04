const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { id, name, email } = decoded;
    req.id = id;
    req.name = name;
    req.email = email;
    console.log("1")
    next();
  } catch {
    res.status(401).json({
      error: "Auth Failed!",
    });
  }
};

module.exports = checkLogin;
