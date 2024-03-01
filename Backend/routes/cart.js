// [SECTION] Dependencies and Modules
const express = require("express");
const cartController = require("../controllers/cart");
const {verify, isLoggedIn} = require("../auth");

// [SECTION] Routing Component
const router = express.Router();


// [SECTION] Get the user's cart
router.get("/get-cart", verify, cartController.getCart);


// [SECTION] Add product to cart
router.post("/add-to-cart", verify, cartController.addToCart);


// [SECTION] Update product quantities
router.put('/update-cart-quantity', verify, cartController.updateQuantity);


// [SECTION] Remove product from cart
router.patch("/:productId/remove-from-cart", verify, cartController.removeProductFromCart);


// [SECTION] Clear cart
router.put("/clear-cart", verify, cartController.clearCart);






// [SECTION] Export Route System
// Allows us to export the "router" object that will be accessed in our "index.js" file
module.exports = router;