import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import Swal from 'sweetalert2';
import Loader from '../components/Loader';
import Dashboard from './Dashboard';

const ManageProducts = () => {
    const [arrival, setArrival] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://ecommerce-shop-p-server.onrender.com/product')
            .then((response) => {
                setArrival(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    // Function to delete an product
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://ecommerce-shop-p-server.onrender.com/product/${id}`)
                    .then(() => {
                        // Remove the deleted item from the state
                        setArrival((prevArrival) => prevArrival.filter(item => item._id !== id));
                        Swal.fire(
                            'Deleted!',
                            'Your product has been deleted.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error("Error deleting product:", error);
                        Swal.fire(
                            'Error!',
                            'There was an issue deleting the product.',
                            'error'
                        );
                    });
            }
        });
    };

    if (loading) return <Loader />;

    return (
        <div className='mb-6'>
            <Dashboard/>
            <div className='max-w-screen-xl mx-auto -mt-20 md:-mt-28'>
                <div>
                    <div className="text-black  font-bold text-xl md:text-2xl font-cinzel text-center mb-8">Manage Products</div>
                    <div className="max-w-4xl mx-auto shadow-md bg-white border border-gray-200">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row justify-between mb-6 items-center">
                                <div className="md:text-3xl text-xl font-semibold  mb-4 md:mb-0">
                                    Total Products: {arrival.length}
                                </div>
                                <div className="md:text-3xl text-xl font-semibold  mb-4 md:mb-0">
                                    {/* Total price: Tk.{totalPrice.toFixed(2)} */}
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr className="bg-gray-600  text-white">
                                            <td className="py-2 px-4 uppercase font-bold">#</td>
                                            <td className="py-2 px-4 uppercase font-bold">Image</td>
                                            <td className="py-2 px-4 uppercase font-bold">Name</td>
                                            <td className="py-2 px-4 uppercase font-bold">Price</td>
                                            <td className="py-2 px-4 uppercase font-bold">Category</td>
                                            <td className="py-2 px-4 uppercase font-bold">Sub Category</td>
                                            <td className="py-2 px-4 uppercase font-bold">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arrival.map((product, index) => (
                                            <tr key={product._id} className="border-t">
                                                <td className="py-2 px-4 text-[hsl(0,0%,8%)] font-bold">{index + 1}</td>
                                                <td className="py-2 px-4 ">
                                                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover mx-auto" />
                                                </td>
                                                <td className="py-2 px-4 text-[#737373]">{product.name}</td>
                                                <td className="py-2 px-4 text-[#737373]">Tk.{product.price.toFixed(2)}</td>
                                                <td className="py-2 px-4 text-[#737373] uppercase">{product.category}</td>
                                                <td className="py-2 px-4 text-[#737373] uppercase">{product.subcategory}</td>
                                                <td className="py-2 px-4 flex space-x-2">
                                                    <Link to={`/update/${product._id}`} className="bg-gray-600  text-white px-2 py-2 rounded btn">
                                                        <MdOutlineModeEditOutline />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="bg-red-500 text-white px-2 py-2 rounded btn">
                                                        <FaTrashAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
