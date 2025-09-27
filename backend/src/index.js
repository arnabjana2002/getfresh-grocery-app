import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "../configs/db.js";
import userRouter from "../routes/user.route.js";
import sellerRouter from "../routes/seller.route.js";
import connectCloudinary from "../configs/cloudinary.js";
import productRouter from "../routes/product.route.js";
import cartRouter from "../routes/cart.route.js";
import addressRouter from "../routes/address.route.js";
import orderRouter from "../routes/order.route.js";
import { stripeWebhooks } from "../controllers/order.controller.js";

const app = express();

const port = process.env.PORT || 4000;

//! Stripe Webhook Route
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

//* Middleware Configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

//* Routes
app.get("/", (_, res) => {
  res.send("Hello Word from GetFresh Server");
});
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

//* MongoDB Connection
connectDB().then((res) => {
  console.log("Database connected:", res.connection.host);
});

//* Cloudinary Connection
await connectCloudinary();

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
