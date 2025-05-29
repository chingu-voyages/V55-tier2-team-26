const jwt = require("jsonwebtoken");

const verification = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    res
      .status(400)
      .send({ error: "There was an error when sending request..." });
  }
};

module.exports = { verification };
