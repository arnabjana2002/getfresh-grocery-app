import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ success: false, message: "Not Authorized" });
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    if (decodedToken.id) {
      req.user = { userId: decodedToken.id };
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
    next();
  } catch (error) {
    console.log("Error in Auth middleware", error.message);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
