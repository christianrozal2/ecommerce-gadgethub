import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductSearchByPrice from './ProductSearchByPrice';
import { close, downArrow, upArrow } from '../assets/assets';

const ProductSearch = ({ products }) => {
  // Search by name
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [priceSearchResults, setPriceSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false); // Track if search has been performed
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(() => {
    return window.matchMedia('(min-width: 768px)').matches ? false : true; 
  });

  const handleSearch = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/searchByName`, {
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
    <div className="container px-0 lg:mt-20 sm:mt-16 mt-12">
      <div className='flex sm:flex-row flex-col lg:gap-32 md:gap-24 sm:gap-16 gap-12'>  
        <div className='lg:w-[20%]'>
          <div className='flex gap-3 justify-between mb-4 cursor-pointer sm:mt-5 items-center group' onClick={() => setIsSearchCollapsed(!isSearchCollapsed)}>
            <h2 className="sm:text-2xl text-lg font-bold group-hover:text-gray-400">Product Search</h2>
            <img src={isSearchCollapsed ? downArrow : upArrow} alt="arrow" className='size-4' />
          </div>
          <div className={`${isSearchCollapsed ? 'hidden' : ''}`}> 
            <h2 className="sm:text-lg text-base font-semibold mb-2">By Name</h2>
            <div className="mb-4">
              <label htmlFor="productName" className="text-gray-500 sm:text-base text-sm">Product Name</label>
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
        </div>
        <div className='sm:w-[80%]'>
          {isSearched && searchResults.length === 0 && priceSearchResults.length === 0 ? (
            <div className=''>
              <p className="text-xl font-bold mt-5 text-red-500">No results found. Please try again.</p>
            </div>
          ) : (
            <div className=''>
              {priceSearchResults.length > 0 ? (
                <div className=''>
                  <h3 className="sm:text-xl text-lg font-bold mt-5">Search by Price Results:</h3>
                  <p className="text-gray-500">Found {priceSearchResults.length} product/s</p>
                  <div className='grid sm:grid-cols-3 grid-cols-2 sm:gap-7 gap-4'>
                    {priceSearchResults.map(product => (
                      <ProductCard productProp={product} key={product._id} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className=''>
                  {searchResults.length > 0 ? (
                    <div className=''>
                      <h3 className="sm:text-xl text-lg font-bold mt-5">Search by Name Results:</h3>
                      <p className="text-gray-500">Found {searchResults.length} product/s</p>
                      <div className='grid sm:grid-cols-3 grid-cols-2 sm:gap-7 gap-4'>
                        {searchResults.map(product => (
                          <ProductCard productProp={product} key={product._id} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className='grid sm:grid-cols-3 grid-cols-2 sm:gap-7 gap-4'>
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
