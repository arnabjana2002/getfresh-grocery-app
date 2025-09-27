import { Router } from "express";
import {
  isSellerAuth,
  sellerLogin,
  sellerLogout,
} from "../controllers/seller.controller.js";
import authSeller from "../middlewares/seller.middleware.js";

const sellerRouter = new Router();

// Routes
sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/is-auth", authSeller, isSellerAuth);
sellerRouter.get("/logout", authSeller, sellerLogout);

export default sellerRouter;
