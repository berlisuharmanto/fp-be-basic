const jwt = require("jsonwebtoken");
const loginAPIError = require("../errors/loginErrors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new loginAPIError("No token provided", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded;
    req.user = email;
    next();
  } catch (error) {
    throw new loginAPIError("Not authorized to access this route", 401);
  }
};

module.exports = authenticationMiddleware;
