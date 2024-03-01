// [SECTION] Dependencies and Modules
const express = require("express");
const orderController = require("../controllers/order");
const {verify, isLoggedIn, verifyAdmin} = require("../auth");


// [SECTION] Routing Component
const router = express.Router();


// [SECTION] Create Order
router.post("/checkout", verify, orderController.createOrder);


// [SECTION] Retrieve logged in user's orders
router.get("/my-orders", verify, isLoggedIn, orderController.getMyOrders);


// [SECTION] Retrieve all orders (Admin Only)
router.get("/all-orders", verify, verifyAdmin, orderController.getAllOrders);


// [SECTION] Export Route System

module.exports = router;