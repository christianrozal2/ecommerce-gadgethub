import React, { useState } from 'react';

const ProductSearchByPrice = ({ onPriceSearch }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://ec2-18-220-120-229.us-east-2.compute.amazonaws.com/b1/products/searchByPrice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ minPrice, maxPrice }),
            });

            const data = await response.json();

            if (response.ok) {
                onPriceSearch(data); // Pass the search results to the parent component
            } else {
                console.error(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="mt-10">
            <form className="mb-4" onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold mb-2">By Price Range</h2>
                <div className="mb-3">
                    <label htmlFor="minPrice" className="text-gray-500">Min Price</label>
                    <input
                        type="number"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="1000"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="maxPrice" className="text-gray-500">Max Price</label>
                    <input
                        type="number"
                        className="border border-gray-300 rounded-md py-2 px-4 w-full"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="10000"
                    />
                </div>
                <button className="bg-black hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded">
                    Search
                </button>
            </form>
        </div>
    );
};

export default ProductSearchByPrice;
