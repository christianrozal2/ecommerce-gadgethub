// [SECTION] Dependencies and Modules
const bcrypt = require("bcrypt");
const Cart = require("../models/Cart");
const auth = require("../auth");
const User = require("../models/User");
const Product = require("../models/Product");



// [SECTION] Get Cart
module.exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from JWT (provided by 'verify' middleware)
  
    const cart = await Cart.findOne({ userId: userId });
  
    if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
    }
  
    res.json({ cart });
  
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Error retrieving cart', error: error.message });
  }
  };



// [SECTION] Add product to cart
module.exports.addToCart = async (req, res) => {
  try {
      const userId = req.user.id;
      const { productId, quantity, subtotal } = req.body;

      // Find the user's cart (create if it doesn't exist)
      let cart = await Cart.findOne({ userId }); 
      if (!cart) {
          cart = new Cart({ userId }); 
      }

      // Fetch product details
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Check if product already exists in cart
      const existingItem = cart.cartItems.find((item) => item.productId.toString() === productId); 

      if (existingItem) {
          // Update quantity and subtotal
          existingItem.quantity += quantity;
          existingItem.subtotal += subtotal;
      } else {
          // Add new product item
          cart.cartItems.push({ 
              productId, 
              quantity, 
              subtotal,
              name: product.name,
          });
      }

    // Update total price
    cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.subtotal, 0);

    // Save the updated cart
    await cart.save();

    res.json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('Error Details:', error);
    res.status(500).json({ message: 'Error adding product to cart', error: error.message });
  }
};



// [SECTION] Update product quantity
module.exports.updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity, subtotal } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product to update
    const itemToUpdate = cart.cartItems.find((item) => item.productId.toString() === productId);

    if (itemToUpdate) {
      // Update quantity and subtotal
      itemToUpdate.quantity = quantity;
      itemToUpdate.subtotal = subtotal;
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Recalculate total price
    cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.subtotal, 0);

    // Save the updated cart
    await cart.save();

    res.json({ message: 'Product quantity updated', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating cart quantity', error: error.message });
  }
};

// [SECTION] Remove product from cart
module.exports.removeProductFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.isAdmin) {
      return res.status(403).json({ message: 'Admins are not allowed to remove products from the cart' });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const removedProduct = cart.cartItems.find(item => item.productId.toString() === productId);
    if (!removedProduct) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
    cart.totalPrice -= removedProduct.subtotal;
    cart.cartItems = cart.cartItems.filter(item => item.productId.toString() !== productId);
    await cart.save()
      .then(savedCart => {
        res.json({ message: 'Product removed from cart', cart: savedCart });
      })
      .catch(error => {
        throw new Error('Error saving cart after removing product: ' + error.message);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing product from cart', error: error.message });
  }
};


// [SECTION] Clear cart
module.exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId); // Assuming you have a User model
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.isAdmin) {
      return res.status(403).json({ message: 'Admins are not allowed to clear the cart' });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.cartItems = [];
    cart.totalPrice = 0;
    await cart.save()
      .then(savedCart => {
        res.json({ message: 'Cart cleared successfully', cart: savedCart });
      })
      .catch(error => {
        throw new Error('Error saving cart after clearing: ' + error.message);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};