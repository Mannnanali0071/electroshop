import express from "express"
import { createOrder, deleteOrderById, getOrderById, getOrdersCount, getOrders, getTotalSales, updateOrderById, userOrderHistory } from "../controllers/orderController.js";
import { checkAuthenticate } from "../middlewares/checkAuthenticate.js"

const router = express.Router();

router.get("/", getOrders);
router.post("/", checkAuthenticate, createOrder);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);
router.get("/get/totalsales", getTotalSales)
router.get("/get/count", getOrdersCount)
router.get("/get/userorders/:userid", userOrderHistory)


export default router;