// [SECTION] Dependencies and Modules
const bcrypt = require("bcrypt");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const auth = require("../auth");


// [SECTION] Create Order
module.exports.createOrder = async (req, res) => {
    try {
      // 3. Find user's cart
      const cart = await Cart.findOne({ userId: req.user.id }); // Assuming 'req.user.id' comes from JWT data
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found for this user' });
      }
  
      // 5. Check if cart has items  
      if (cart.cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }
  
      // 5a. Create new Order document
      const newOrder = new Order({
        userId: req.user.id,
        productsOrdered: cart.cartItems,
        totalPrice: cart.totalPrice
      });
  
      // 6. Save Order document
      const savedOrder = await newOrder.save();

       // Clear the cart after creating the order
        cart.cartItems = [];
        cart.totalPrice = 0;
        await cart.save();
  
      // 6a. Send success response
      res.status(201).json({
        message: 'Order created successfully',
        order: savedOrder
      });
    } catch (err) {
      // 6b & 7. Handle errors
      console.error(err); // Log the error for debugging
      res.status(500).json({ message: 'Error creating order', error: err.message });
    }
  };


// [SECTION] Retrieve logged in user's orders
module.exports.getMyOrders = async (req, res) => {
    try {
      // 3. Retrieve user's orders
      const orders = await Order.find({ userId: req.user.id });
  
      // 4. Check if orders exist
      if (orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
  
      // 5. Send orders to the client
      res.status(200).json(orders);
    } catch (err) {
      // 6. Error handling
      console.error(err);
      res.status(500).json({ message: 'Error retrieving orders', error: err.message });
    }
  };

// [SECTION] Retrieve all orders (Admin Only)
module.exports.getAllOrders = async (req, res) => {
    try {
      // 2. JWT Validation & Admin Authorization (handled by 'verify' middleware)
  
      // 3. Retrieve all orders
      const orders = await Order.find();
  
      // 4. Send orders to the client
      res.status(200).json(orders);
    } catch (err) {
      // 5. Error handling
      console.error(err);
      res.status(500).json({ message: 'Error retrieving orders', error: err.message });
    }
  };