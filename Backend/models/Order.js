const mongoose = require("mongoose");

// [SECTION] Schema/Blueprint
const orderSchema = new mongoose.Schema({
	userId: {
		type: String,
		// By having the required property setting its value to true this will make the User ID as a required field
		required: [true, 'User ID is Required']
	}, 
	productsOrdered: [
		{
			productId: {
				type: String,
				required: [true, 'Product ID is Required']
			},
			quantity: {
				type: Number,
				required: [true, 'Quantity is Required']
			},
			subtotal: {
				type: Number,
				required: [true, 'Subtotal is Required']
			}	
		}
	],
	totalPrice: {
		type: Number,
		required: [true, 'totalPrice is Required']
	},
	orderedOn: {
		type: Date,
		// Default value is set to the current date when not provided by having the Date.now
		default: Date.now
	},
	status: {
		type: String,
		default: 'Pending'
	}
	
})

// [SECTION] Model
module.exports = mongoose.model('Order', orderSchema);