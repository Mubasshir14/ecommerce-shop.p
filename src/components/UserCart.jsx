import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import useCart from '../hooks/useCart';
import Dashboard from '../Dashboard/Dashboard';

const UserCart = () => {
    const [cart, refetch] = useCart();
    const totalOrders = cart.length;
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire("Error", "There was an issue deleting the item.", "error");
                    });
            }
        });
    }

    return (
        <div>
            <Dashboard />
            <div className='max-w-screen-xl mx-auto min-h-[calc(100vh-250px)] md:-mt-32 -mt-36 p-4 md:p-8'>
                <div className="text-black font-bold text-xl md:text-2xl font-cinzel text-center mb-8">Carts</div>

                {cart.length > 0 ? (
                    <div className='flex items-center lg:justify-center lg:flex-row flex-col gap-4'>
                        <div className='border-2 border-black p-2 rounded-lg'>
                            {cart.map((c, index) => (
                                <div key={index} className="card card-side p-2 flex flex-col md:flex-row border border-[#1313181A] mb-4 w-full  md:w-[600px]">
                                    <figure><img src={c.image || "placeholder-image-url"} alt="Item" className="w-32 h-32 object-cover" /></figure>
                                    <div className="card-body p-0 my-8 lg:my-0 lg:p-2 mt-4 lg:mt-0 flex flex-col justify-between ">
                                        <div className='flex justify-between items-center'>
                                            <h2 className="card-title font-extrabold text-xl text-[#131318]">{c.name}</h2>

                                            <button
                                                onClick={() => handleDelete(c._id)}
                                                className="bg-gray-600  text-white px-2 py-2 rounded ml-6">
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                        <div>
                                            
                                            <div className="flex flex-col lg:flex-row lg:gap-3">
                                                <h2 className="text-[#FF4240] font-extrabold mb-3 lg:mb-0">Price - ${c.price.toFixed(0)}</h2>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full max-w-sm border-2 border-black bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${totalPrice}</span>
                            </div>

                            <div className="flex justify-between mb-2">
                                <span>Discount (0%)</span>
                                <span className="text-red-500">-$0</span>
                            </div>

                           
                            <hr className='border-2 border-black' />

                            <div className="flex justify-between font-bold text-xl mt-4 mb-6">
                                <span>Total</span>
                                <span>${totalPrice}</span>
                            </div>

                            <div className="flex space-x-2 mb-4">
                                <input
                                    type="text"
                                    disabled
                                    placeholder="Add promo code"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                                />
                                <button className="bg-black text-white px-4 py-2 rounded-md">Apply</button>
                            </div>

                            <Link to='/checkout' className="w-full bg-black btn text-white py-3 rounded-md font-bold">
                                Go to Checkout ➔
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-4 rounded-lg">
                        <Link to="/shop">
                            <button className="bg-gray-600 text-white px-4 py-2 text-xl rounded mt-4">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserCart;
