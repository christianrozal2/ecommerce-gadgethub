require('dotenv').config();
// [SECTION] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order")

// [SECTION] Environment Setup
const port = 4001;

// [SECTION] Server Setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// [SECTION] Database Connection

mongoose.connect("mongodb+srv://christianrozal2:admin@cluster0.vgdpbcv.mongodb.net/E-Commerce-API-MVP?retryWrites=true&w=majority")
    .then(() => { 
        console.log("Database connected successfully");

    })
    .catch(error => {
        console.error("Error connecting to database:", error); 
    }); 

app.get("/", (req, res) => {
    console.log("Request received for root route '/'"); 
    res.json("Hello")
})

// [SECTION] Backend Routes
// Groups all routes in userRoutes under "/users"
app.use("/users", userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

// [SECTION] Server Gateway Response
if(require.main === module){
	// "process.env.PORT || port" will use the environment variable if it is avaiable OR will used port 4000 if none is defined
	console.log("API Server attempting to start..."); 
	app.listen(process.env.PORT || port, () => {
		console.log(`API is now online on port ${process.env.PORT || port}`)
	});
}

module.exports = { app, mongoose };
