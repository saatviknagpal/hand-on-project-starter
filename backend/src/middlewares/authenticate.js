const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { email: user.email, id: user.id },
    process.env.SECRET_KEY,
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, process.env.SECRET_KEY);
    if (validToken) {
      req.authenticated = true;
      res.json("Authentication Successful");
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
