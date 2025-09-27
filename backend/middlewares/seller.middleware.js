import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  if (!sellerToken)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Admin" });

  try {
    const decodedToken = jwt.verify(sellerToken, process.env.JWT_TOKEN_SECRET);
    if (decodedToken.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Admin" });
    }
  } catch (error) {
    console.log("Error in Auth middleware", error.message);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authSeller;
