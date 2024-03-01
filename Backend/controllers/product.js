// [SECTION] Dependencies and Modules
const express = require("express");
const auth = require("../auth");
const User = require("../models/User");
const {verify, verifyAdmin} = auth;
const Product = require("../models/Product");



// [SECTION] Adding product
module.exports.addProduct = (req, res) => {
    // Creates a variable "newProduct" and instantiates a new "Product" object using the mongoose model
    // Uses the information from the request body to provide all the necessary information
    let newProduct = new Product({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price
    });
    Product.findOne({ name: req.body.name })
    .then(existingProduct => {
        if(existingProduct){
            return res.status(409).send({ error : 'Product already exists'});
        }
        // Saves the created object to our database
        return newProduct.save()
        .then(savedProduct => {
            res.status(201).send(savedProduct)
        })
        // Error handling is done using .catch() to capture any errors that occur during the product save operation
        // .catch(err => err) captures the error but does not take any action, it's only capturing the error to pass it on to the next .then() or .catch() method in the chain. Postman is waiting for a response to be sent back to it but is not receiving anything
        .catch(saveErr => {
            console.error("Error in saving product: ", saveErr)
            res.status(500).send({error: 'Failed to save the product'})
        })
    })
    .catch(findErr => {
        console.error("Error in finding the product: ", findErr)
        return res.status(500).send({ error: "Error finding the product" });
    });
}; 



// [SECTION] Retrieve all products
module.exports.getAllProducts = (req, res) => {
    return Product.find({}).then(products => {
        if(products.length > 0){
            return res.status(200).send({ products });
        }
        else{
            // 200 is a result of a successful request, even if the response returned no record/content
            return res.status(200).send({ message: 'No products found.' });
        }
    })
    .catch(err => {
        console.error("Error in finding all products:", err)
        return res.status(500).send({ error: 'Error finding products.'})
    });
};



// [SECTION] Retrieve all active products
module.exports.getAllActive = (req, res) => {
    Product.find({ isActive: true })
    .then(products => {
        // if the result is null
        if(products.length > 0){
            // send the result as a response
            return res.status(200).send({products});
        } else {
            return res.status(200).send({ message: 'No active products found.'});
        }
    })
    .catch(err => {
        console.error("Error in finding active products: ", err)
        return res.status(500).send({ error: 'Error finding active products.'})
    });
}



// [SECTION] Retrieve a specific product
module.exports.getProduct = (req, res) => {

    const productId = req.params.productId;

    Product.findById(productId)
    .then(product => {
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        return res.status(200).send({ product });
    })
    .catch(err => {
        console.error("Error in fetching the product: ", err)
        return res.status(500).send({ error: 'Failed to fetch product' });
    })
    
};



// [SECTION] Update product (Admin Only)
module.exports.updateProduct = (req, res) => {

    // Made variable names more descriptive to enhance code readability
    const productId = req.params.productId;

    let updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    } 

    Product.findByIdAndUpdate(productId, updatedProduct, { new : true })
    .then(updatedProduct => {

        if(!updatedProduct) {
            return res.status(404).send({ error: 'Product not found'});
        } 
        return res.status(200).send({ 
            message: 'Product updated successfully', 
            updatedProduct: updatedProduct 
        })
    })
    .catch(err => {
        console.error("Error in updating a product: ", err)
        return res.status(500).send({error: 'Error in updating a product.'})
    });
};



// [SECTION] Archive a product (Admin Only)
module.exports.archiveProduct = (req, res) => {
    let updateActiveField = {
        isActive: false
    }

    if (req.user.isAdmin == true){
        return Product.findByIdAndUpdate(req.params.productId, updateActiveField, {new: true})
        .then(archiveProduct => {
            if (!archiveProduct) {
                return res.status(404).send({ error: 'Product not found' });
            }
            return res.status(200).send({ 
                message: 'Product archived successfully', 
                archiveProduct: archiveProduct 
            });
        })
        .catch(err => {
            console.error("Error in archiving a product: ", err)
            return res.status(500).send({ error: 'Failed to archive product' })
        });
    }
    else {
        return res.status(403).send(false);
    }
};



// [SECTION] Activate a product (Admin Only)
module.exports.activateProduct = (req, res) => {
    let updateActiveField = {
        isActive: true
    }
    if (req.user.isAdmin == true){
        return Product.findByIdAndUpdate(req.params.productId, updateActiveField, {new: true})
        .then(activateProduct => {
            if (!activateProduct) {
                return res.status(404).send({ error: 'Product not found' });
            }
            return res.status(200).send({ 
                message: 'Product activated successfully', 
                activateProduct: activateProduct
            });
        })
        .catch(err => {
            console.error("Error in activating a product: ", err)
            return res.status(500).send({ error: 'Failed activating a product' })
        });
    }
    else{
        return res.status(403).send(false);
    }
};


// [SECTION] Search product by name
module.exports.searchProductsByName = async (req, res) => {
  try {
    const name = req.body.name.toString();
    const products = await Product.find({
        name: { $regex: name, $options: 'i' }
    });
    res.status(200).json(products);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};

// [SECTION] Search product by price range
module.exports.searchProductsByPrice = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.body;
        const products = await Product.find({
            price: { $gte: minPrice, $lte: maxPrice }
        });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};