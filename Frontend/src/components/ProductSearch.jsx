import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductSearchByPrice from './ProductSearchByPrice';
import { close } from '../assets/assets';

const ProductSearch = ({ products }) => {
  // Search by name
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [priceSearchResults, setPriceSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false); // Track if search has been performed

  const handleSearch = async () => {
    try {
      const response = await fetch('http://ec2-18-220-120-229.us-east-2.compute.amazonaws.com/b1/products/searchByName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
      setIsSearched(true); // Set to true after search
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  // Function to handle price search results
  const handlePriceSearch = (results) => {
    setPriceSearchResults(results);
    setIsSearched(true); // Set to true after search
  };

  // Function to clear search results
  const clearSearchResults = () => {
    setSearchResults([]);
    setPriceSearchResults([]);
    setIsSearched(false); // Reset to false when clearing search
  };

  return (
    <div className="container px-0 mt-20">
      <div className='flex gap-32'>
        <div className='w-[20%] mt-5'>
          <h2 className="text-2xl font-bold mb-4">Product Search</h2>
          <h2 className="text-lg font-semibold mb-2">By Name</h2>
          <div className="mb-4">
            <label htmlFor="productName" className="text-gray-500">Product Name</label>
            <input
              type="text"
              id="productName"
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
            />
          </div>
          <button className="bg-black hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded" onClick={handleSearch}>
            Search
          </button>

          <ProductSearchByPrice onPriceSearch={handlePriceSearch} />
          <button className="bg-white border-2 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded mt-10 flex gap-2 items-center" onClick={clearSearchResults}>
            Clear Results
            <img src={close} alt="clear" className='size-3' />
          </button>
        </div>
        <div className='w-[80%]'>
          {isSearched && searchResults.length === 0 && priceSearchResults.length === 0 ? (
            <div className=''>
              <p className="text-xl font-bold mt-5 text-red-500">No results found. Please try again.</p>
            </div>
          ) : (
            <div className=''>
              {priceSearchResults.length > 0 ? (
                <div className=''>
                  <h3 className="text-xl font-bold mt-5">Search by Price Results:</h3>
                  <p className="text-gray-500">Found {priceSearchResults.length} product/s</p>
                  <div className='grid grid-cols-3 gap-7'>
                    {priceSearchResults.map(product => (
                      <ProductCard productProp={product} key={product._id} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className=''>
                  {searchResults.length > 0 ? (
                    <div className=''>
                      <h3 className="text-xl font-bold mt-5">Search by Name Results:</h3>
                      <p className="text-gray-500">Found {searchResults.length} product/s</p>
                      <div className='grid grid-cols-3 gap-7'>
                        {searchResults.map(product => (
                          <ProductCard productProp={product} key={product._id} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className='grid grid-cols-3 gap-7'>
                      {products}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
