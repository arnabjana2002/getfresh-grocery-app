import jwt from "jsonwebtoken";

//* Seller Login
// Endpoint: /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.SELLER_EMAIL ||
      password !== process.env.SELLER_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Seller Credentials" });
    }

    const sellerToken = jwt.sign({ email }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    });

    res.cookie("sellerToken", sellerToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Seller Logged In" });
  } catch (error) {
    console.log("Error in sellerLogin controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Seller isAuth
// Endpoint: /api/seller/is-auth
export const isSellerAuth = async (_, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in isSellerAuth controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Seller Logout
// Endpoint: /api/seller/logout
export const sellerLogout = async (_, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res
      .status(200)
      .json({ success: true, message: "Seller Logged Out" });
  } catch (error) {
    console.log("Error in sellerLogout controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
