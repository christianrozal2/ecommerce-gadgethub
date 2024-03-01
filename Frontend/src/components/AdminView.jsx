import { useState, useEffect } from 'react';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import Button from './Button';
import AddProduct from '../pages/AddProduct';

export default function AdminView({ productsData, fetchData }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsArr = productsData.map(product => (
            <tr key={product._id}>
                <td className='p-4'>{product._id}</td>
                <td className='p-4 max-w-56 truncate'>{product.name}</td>
                <td className='p-4 max-w-xs truncate'>{product.description}</td>
                <td className='p-4'>₱{product.price}.00</td>
                <td className={product.isActive ? "text-green-600 p-4" : "text-red-600 p-4"}>
                    {product.isActive ? "Available" : "Unavailable"}
                </td>
                <td className='px-4'><EditProduct product={product._id} fetchData={fetchData} /></td>
                <td className='px-4'><ArchiveProduct className="btn btn-danger" product={product._id} isActive={product.isActive} fetchData={fetchData} /></td>
            </tr>
        ));

        setProducts(productsArr);
    }, [productsData]);

    return (
        <div className='container px-0'>
            <h1 className="text-center text-4xl font-bold mt-36"> Admin Dashboard</h1>
            <p className='mt-5 lg:mx-36 text-lg text-center text-gray-500'>Welcome to gadget hub Admin Dashboard—an all-in-one solution for managing and optimizing your online store. From order fulfillment to inventory control and marketing insights, our dashboard empowers you to streamline operations and drive growth effortlessly. Take charge of your ecommerce empire and unlock its full potential today!</p>

            <h2 className='text-3xl font-bold mt-36'>Products</h2>

            <table className="table-auto w-full mt-10 border border-gray-200">
                <thead>
                    <tr className="text-left">
                        <th className="p-4">ID</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Availability</th>
                        <th className="p-4" colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </table>
            <div className='my-10'>
             <AddProduct />
            </div>
        </div>
    );
}
