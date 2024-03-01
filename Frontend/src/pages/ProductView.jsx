import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { p1 } from "../assets/assets";
import FeaturedProducts from "../components/FeaturedProducts";

const ProductView = () => {
    const { productId } = useParams();
    const { user } = useContext(UserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1); // Default quantity is 1
    const [subtotal, setSubtotal] = useState(0); // Initialize subtotal
    const navigate = useNavigate();

    // Function to handle incrementing quantity
    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Function to handle decrementing quantity
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const addToCart = () => {
        // Calculate subtotal
        const calculatedSubtotal = parseFloat(price) * parseInt(quantity);
        console.log('Price:', price);
        console.log('Quantity:', quantity);
        console.log('Calculated Subtotal:', calculatedSubtotal);
    
        fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/add-to-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ 
                productId,
                quantity,
                subtotal: calculatedSubtotal // Pass calculated subtotal to the server
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message);
            if (data.message === "Admin is forbidden") {
                Swal.fire({
                    icon: 'error',
                    title: 'Admin error',
                    text: 'You are an administrator. You may not enroll in a product.'
                })
            } else if (data.message === "Product added to cart") {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully added',
                    text: 'You have successfully added this product to your cart.'
                });
                
                navigate('/cart');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong.',
                    text: 'Please try again.'
                })
            }
        })
    }
    
    // Recalculate subtotal whenever quantity changes
    useEffect(() => {
        const calculatedSubtotal = parseFloat(price) * parseInt(quantity);
        setSubtotal(calculatedSubtotal);
    }, [quantity, price])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
        })
    }, [productId])

    return (
        <div className="container px-0 mt-20">
            <div className="flex gap-10">
                <div className="w-[50%] bg-container flex items-center justify-center">
                    <img src={p1} alt="p1" className="max-w-xs" />
                </div>
                <div className="w-[50%]">
                    <div className="">
                        <div className="">
                            <h2 className="text-4xl font-bold">{name}</h2>
                            <p className="text-green-600 mt-4">In Stock</p>
                            <p className="text-gray-700 mt-4">{description}</p>
                            <p className="text-lg mt-4">₱{price}.00</p>
                            
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Quantity:</label>
                                <div className="flex">
                                    <button className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l hover:bg-gray-400" onClick={decrementQuantity}>-</button>
                                    <input
                                        className="border py-2 px-3 text-gray-700 w-12 text-center custom-number-input"
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    />
                                    <button className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r hover:bg-gray-400" onClick={incrementQuantity}>+</button>
                                </div>
                            </div>
                            <p className="text-gray-700 text-lg mt-4 font-semibold">Subtotal: ₱{subtotal}.00</p> {/* Render subtotal */}
                            { user.id !== null ?
                                <button className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded w-full mt-4" onClick={addToCart}>Add to Cart</button> :
                                <Link to="/login" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">Login to buy</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <h2 className="text-2xl">Related Products</h2>
                <FeaturedProducts />
            </div>
        </div>
    );
}

export default ProductView;
