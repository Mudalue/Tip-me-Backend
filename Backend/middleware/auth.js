import jwt from "jsonwebtoken";
import "dotenv/config";

const verify = jwt.verify;
export const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    verify(token, process.env.TOKEN_SECRET);
    if (!token) return res.status(401).json({ message: "Access Denied" });
    const verifiedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    req.user = verifiedToken;

    next();
    // let base64Url = token.split('.')[1]; // token you get
    // let base64 = base64Url.replace('-', '+').replace('_', '/');
    // let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
    // return decodedData;
  } catch (error) {
    res.status(400).json({ message: "Invalid/Expired Token" });
  }
};
