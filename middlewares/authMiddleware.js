const JWT = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed",
          err,
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      err,
      message: "Authentication failed",
    });
  }
};
