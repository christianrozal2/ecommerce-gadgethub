import { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; 

export default function FeaturedProducts() {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/products/`)
            .then(res => res.json())
            .then(data => {
                const numbers = [];
                const featured = [];

                const generateRandomNums = () => {
                    let randomNum = Math.floor(Math.random() * data.products.length);

                    if (numbers.indexOf(randomNum) === -1) {
                        numbers.push(randomNum);
                    } else {
                        generateRandomNums();
                    }
                };

                // Adjust loop to map 4 random products
                for (let i = 0; i < 4; i++) {
                    generateRandomNums();

                    featured.push(
                        <ProductCard key={i} productProp={data.products[numbers[i]]} />
                    );
                }

                setPreviews(featured);
            });
    }, []);

    return (
        <>
            <div className="grid sm:grid-cols-4 grid-cols-2 sm:gap-7 gap-4">
                {previews}
            </div>
        </>
    );
}
