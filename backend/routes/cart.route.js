import { Router } from "express";
import { updateCart } from "../controllers/cart.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const cartRouter = new Router();

//* Routes
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
