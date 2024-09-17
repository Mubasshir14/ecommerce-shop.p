import React, { useState } from 'react';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 

const CheckOut = () => {
    const [cart] = useCart();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); 
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const totalCartPrice = cart.reduce((acc, item) => acc + item.price, 0);
    const deliveryFee = 150;
    const displayPrice = (totalCartPrice + deliveryFee).toFixed(0);

    const onSubmit = async (data, event) => {
        event.preventDefault(); 

        if (isSubmitting) return; 
        setIsSubmitting(true); 

        const orderDetails = {
            ...data,
            cart,
            totalCartPrice,
            deliveryFee,
            displayPrice
        };

        navigate('/payment', { state: { orderDetails } });

       
    };


    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg border-2 border-black my-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Checkout Form</h2>

            <div className='flex lg:flex-row flex-col gap-2'>
                {/* Cart Summary */}
                <div className="mb-8">
                    <div className='border-2 border-black rounded-lg p-4 md:p-6'>
                        <ul className="flex flex-col gap-4 md:gap-6">
                            {cart.map((c, index) => (
                                <div key={index} className="card card-side p-2 flex flex-col md:flex-row border border-[#1313181A] mb-4 w-full">
                                    <figure><img src={c.image} alt="Item" className="w-20 h-20 object-cover" /></figure>
                                    <div className="card-body p-0 my-8 lg:my-0 lg:p-2 mt-4 lg:mt-0 flex flex-col justify-between">
                                        <h2 className="card-title font-extrabold text-xl text-[#131318]">{c.name}</h2>
                                        <h2 className="text-[#FF4240] font-extrabold mb-3 lg:mb-0">Price - ${c.price.toFixed(0)}</h2>
                                    </div>
                                </div>
                            ))}
                        </ul>
                        <div className="mt-6 p-4 bg-indigo-100 rounded-lg">
                            <h4 className="text-lg md:text-xl font-semibold text-indigo-800 text-center">Total Cart Price: ${totalCartPrice.toFixed(2)}</h4>
                        </div>
                    </div>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-md rounded-md border border-gray-200 flex-1">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            defaultValue={user.email}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                }
                            })}
                            className="w-full p-2 border border-gray-300 rounded"
                            readOnly
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Mobile</label>
                        <input
                            type="text"
                            {...register("mobile", { required: "Mobile number is required" })}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your mobile number"
                        />
                        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Address</label>
                        <input
                            type="text"
                            {...register("address", { required: "Address is required" })}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your address"
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Total Price (Includes Delivery Fee: $150 )</label>
                        <input
                            type="text"
                            value={displayPrice}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting} 
                        className={`w-full bg-gray-600 text-white py-2 rounded text-xl ${isSubmitting ? 'opacity-50' : ''}`}
                    >
                        {isSubmitting ? 'Processing...' : 'Pay Now'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CheckOut;
