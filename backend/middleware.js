const { JWT_SECRET } = require("./config");

const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, JWT_SECRET);
    req.username = decodedData.username;
    next();
  } catch (e) {
    return res.status(403).json({
      messgae: "Unauthorized",
    });
  }
}

module.exports = {
  authMiddleware,
};
