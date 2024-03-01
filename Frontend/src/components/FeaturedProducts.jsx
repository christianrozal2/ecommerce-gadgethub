import { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; // Assuming this is where your ProductCard component is located

export default function FeaturedProducts() {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetch(`http://ec2-18-220-120-229.us-east-2.compute.amazonaws.com/b1/products/`)
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
            <div className="grid grid-cols-4 gap-7"> {/* Tailwind CSS grid */}
                {previews}
            </div>
        </>
    );
}
