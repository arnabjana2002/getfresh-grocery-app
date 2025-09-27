import { Router } from "express";
import { addAddress, getAddress } from "../controllers/address.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const addressRouter = new Router();

//* Routes
addressRouter.post("/add", authUser, addAddress);
addressRouter.get("/get", authUser, getAddress);

export default addressRouter;
