import express from "express";
import expressAsyncHandler from "express-async-handler";

import {
  isAuth,
  isAdmin,
 } from "../middlewares/auth.js";
import { createOrder, deleteOrder, getAllOrder, getOrderById, getSummary, orderOfMine } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/",isAuth,isAdmin,getAllOrder);
orderRouter.post("/",isAuth,createOrder);
orderRouter.get("/summary",isAuth,isAdmin,getSummary);
orderRouter.get("/mine",isAuth,orderOfMine);
orderRouter.get("/:id",isAuth,getOrderById);

// orderRouter.put("/:id/deliver",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isDelivered = true;
//       order.deliveredAt = Date.now();
//       await order.save();
//       res.send({ message: "Order Delivered" });
//     } else {
//       res.status(404).send({ message: "Order Not Found" });
//     }
//   })
// );

orderRouter.delete("/:id",isAuth,isAdmin,deleteOrder);

export default orderRouter;
