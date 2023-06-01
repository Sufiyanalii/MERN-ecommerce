import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";


export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { algorithm: "HS384", expiresIn: "30d" }
  );
};

export const isAuth = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send({ message: "No Token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      res.status(401).send({ message: "Invalid Token" });
    } else {
      req.user = decode;
      next();
    }
  });
});

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

