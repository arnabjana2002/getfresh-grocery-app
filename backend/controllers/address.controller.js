import Address from "../models/address.model.js";

//* Add Address Controller
// Endpoint: /api/address/add
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const { userId } = req.user;
    await Address.create({ ...address, userId });
    res
      .status(201)
      .json({ success: true, message: "Address Added Successfully" });
  } catch (error) {
    console.log("Error in addAddress controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Get Address Controller
// Endpoint: /api/address/get
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const addresses = await Address.find({ userId });
    res.status(201).json({ success: true, addresses });
  } catch (error) {
    console.log("Error in getAddress controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
