import authUser from "../middleware/authMiddleware.js";
import adminUser from "../middleware/adminMiddleware.js";
import express from "express";


import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
    updateOrder,
    deleteOrder
} from "../controllers/orderController.js";


const orderRouter = express.Router();

//User routes
orderRouter.post("/createOrder", authUser,createOrder);
orderRouter.get("/getOrderById", authUser, getOrderById);


//Admin routes
orderRouter.get("/getAllOrders",authUser,adminUser, getAllOrders);
orderRouter.put("/updateOrderStatus/:id",authUser, adminUser, updateOrderStatus);
orderRouter.delete("/deleteOrder/:id",authUser, adminUser, deleteOrder);

//both admin and user can update order
orderRouter.put("/updateOrder/:id",authUser, updateOrder);


export default orderRouter;