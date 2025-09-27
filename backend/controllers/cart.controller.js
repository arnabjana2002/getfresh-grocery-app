import User from "../models/user.model.js";

//* Update User cardData Controller
// Endpoint: /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const { userId } = req.user;
    await User.findByIdAndUpdate(userId, { cartItems });
    res.status(200).json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log("Error in updateCart controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
