import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import Button from '../components/Button';

export default function AddProduct() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [showAdd, setShowAdd] = useState(false); // State to control modal visibility

  // Function to open the add product modal
  const openAdd = () => {
    setShowAdd(true);
  };

  // Function to close the add product modal
  const closeAdd = () => {
    setShowAdd(false);
    setName(''); 
    setDescription('');
    setPrice(0);
  };

  function createProduct(e) {
    e.preventDefault();

    let token = localStorage.getItem('token'); 

    fetch(`${import.meta.env.VITE_API_BASE_URL}/products/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.error === "Product already exists") {
        Swal.fire({
          icon: "error",
          title: "Product already exists.",
          text: data.message,
        });
      } else if (data.error === "Failed to save the product") {
        Swal.fire({
          icon: "error",
          title: "Unsuccessful Product Creation",
          text: data.message,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Product Added",
        });
        closeAdd(); // Close the modal after successful addition
        navigate("/products"); 
      }
    });
  }

  return user.isAdmin === true ? (
    <div className="flex-grow md:px-14 sm:px-12 px-6">
      <Button label='+ Add Product' onClick={openAdd}>+ Add Product</Button>

      {/* ADD MODAL */}
      {showAdd && 
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={(e) => createProduct(e)}>
                <div className="bg-white p-5 lg:p-10">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full">
                      <h3 className="text-2xl leading-6 font-semibold text-gray-900">Add Product</h3> 
                      <form onSubmit={(e) => createProduct(e)}>
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
                    </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 flex justify-end gap-4 p-4">
                    <Button label='Close' color='red' onClick={closeAdd} />
                    <Button label='Submit' color='green' />
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  ) : (
    // Authorization Handling
    <div className="container mx-auto p-4 text-center">
      You are not authorized to add products
    </div>
  );
}
