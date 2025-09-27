import User from "../models/user.model.js";

//* Regiater a User
// Endpoint: /api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "Missing Details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Exists" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });
    const token = newUser.createToken(newUser._id);

    res.cookie("token", token, {
      //? Makes the cookie inaccessible to JavaScript (more secure, prevents XSS attacks)
      httpOnly: true,

      //? Send cookie only over HTTPS in production
      secure: process.env.NODE_ENV === "production",

      //? Control cross-site cookie behavior:
      //? - "none" in production → allows cookie to be sent in cross-origin requests (needed if frontend & backend are on different domains)
      //? - "strict" in dev → only sent for same-site requests (safer during development)
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",

      //? Cookie expiration time: 7 days (in milliseconds)
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.log("Error in register controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//* User Login
// Endpoint: /api/user/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "Email & Password are required" });
    }

    //? Finding the user
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });

    //? Checking the password
    const isPassValid = await user.isPasswordCorrect(password);
    if (!isPassValid)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });

    const token = user.createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Check Auth
// Endpoint: /api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select("-password");
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in Check Auth controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//* Logout User
// Endpoint: /api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.status(200).json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
