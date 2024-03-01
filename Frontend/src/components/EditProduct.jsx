import { useState } from "react";
import Swal from "sweetalert2";
import Button from "./Button";

const EditProduct = ({ product, fetchData }) => {

    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [showEdit, setShowEdit] = useState(false);

    // Function for opening the modal
    const openEdit = (productId) => {
        fetch(`http://ec2-18-220-120-229.us-east-2.compute.amazonaws.com/b1/products/${productId}/`)
        .then(res => res.json())
        .then(data => {
            setProductId(data.product._id);
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
        });

        setShowEdit(true);
    };

    // Function for closing the modal
    const closeEdit = () => {
        setShowEdit(false);
        setName('');
        setDescription('');
        setPrice(0);
    };

    // Function for submitting the form
    const editProduct = (e, productId) => {
        e.preventDefault();

        fetch(`http://ec2-18-220-120-229.us-east-2.compute.amazonaws.com/b1/products/${productId}/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.message === 'Product updated successfully') {
                Swal.fire({
                    title: 'Product Updated',
                    text: 'Product has been updated successfully',
                    icon: 'success'
                });
                closeEdit();
                fetchData();
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred',
                    icon: 'error'
                });
                closeEdit();
                fetchData();
            }
        });
    };


  return (
    <>
        <Button label='Edit' color='blue' onClick={() => openEdit(product)} />

        {/*EDIT MODAL*/}
        {showEdit &&
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <form onSubmit={e => editProduct(e, productId)}>
                            <div className="bg-white p-5 lg:p-10">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full">
                                        <h3 className="text-2xl leading-6 font-semibold text-gray-900">Edit Product</h3>
                                        <div className="mt-6"> {/* Name field */}
                                            <label htmlFor="name" className="block text-gray-500">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Enter Name"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400 mt-2"
                                            />
                                        </div>
                                        <div className="mt-4"> {/* Description field */}
                                            <label htmlFor="description" className="block text-gray-500 mt-2">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                placeholder="Enter Description"
                                                required
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400 mt-2"
                                            />
                                        </div>
                                        <div className="mt-4"> {/* Price field */}
                                            <label htmlFor="price" className="block text-gray-500">
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                id="price"
                                                placeholder="Enter Price"
                                                required
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400  mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 flex justify-end gap-4 p-4">
                                <Button label='Close' color='red' onClick={closeEdit} />
                                <Button label='Submit' color='green' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        }
    </>
  );
}

export default EditProduct;
