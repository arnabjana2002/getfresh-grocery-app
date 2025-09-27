import { Router } from "express";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe,
} from "../controllers/order.controller.js";
import authSeller from "../middlewares/seller.middleware.js";
import authUser from "../middlewares/auth.middleware.js";

const orderRouter = new Router();

//* Routes
orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authSeller, getAllOrders);

export default orderRouter;
