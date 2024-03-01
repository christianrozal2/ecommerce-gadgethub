//[SECTION] Dependencies and Modules
const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");
const User = require("../models/User");
const {verify, verifyAdmin} = auth;
const router = express.Router();


// [SECTION] Adding product
router.post("/", verify, verifyAdmin, productController.addProduct); 


// [SECTION] Retrieve all products
router.get("/all", verify, verifyAdmin, productController.getAllProducts);


//[SECTION] Retrieve all active products
router.get("/", productController.getAllActive);


// [SECTION] Retrieve specific product
router.get("/:productId", productController.getProduct);


// [SECTION] Update product (Admin Only)
router.patch("/:productId/update", verify, verifyAdmin, productController.updateProduct);


// [SECTION] Archive a product (Admin Only)
router.patch("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);


// [SECTION] Activate a product (Admin Only)
router.patch("/:productId/activate", verify, verifyAdmin, productController.activateProduct);


// [SECTION] Route for searching products by name
router.post('/searchByName', productController.searchProductsByName);


// [SECTION] Route for searching products by price range
router.post('/searchByPrice', productController.searchProductsByPrice);



//[SECTION] Export Route System
module.exports = router;
