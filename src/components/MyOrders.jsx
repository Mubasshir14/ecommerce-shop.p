import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Loader from './Loader';

const MyOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/payment');
                setOrders(response.data || []);
            } catch (error) {
                setError('Error fetching orders');
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const myOrders = orders.filter(order => order.email === user.email);

    if (loading) return <Loader/>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Dashboard />
            <div className='max-w-screen-xl mb-4 mx-auto -mt-20 md:-mt-28'>
                <div>
                    <div className="text-black font-bold text-xl md:text-2xl font-cinzel text-center mb-8">My Orders</div>
                    <div className=" mx-auto shadow-md bg-white border border-gray-200">
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr className="bg-gray-600 text-white">
                                            <td className="py-2 px-4 uppercase font-bold">#</td>
                                            <td className="py-2 px-4 uppercase font-bold">Image</td>
                                            <td className="py-2 px-4 uppercase font-bold">Name</td>
                                            <td className="py-2 px-4 uppercase font-bold">Price</td>
                                            <td className="py-2 px-4 uppercase font-bold">Payment ID</td>
                                            <td className="py-2 px-4 uppercase font-bold">Amount</td>
                                           
                                            <td className="py-2 px-4 uppercase font-bold">Status</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myOrders.length > 0 ? (
                                            myOrders.map((order, index) => (
                                                order.cart && Array.isArray(order.cart) ? (
                                                    order.cart.map((product, productIndex) => (
                                                        <tr key={`${order._id}-${product._id}`} className={`border-t ${productIndex === 0 ? 'bg-gray-100' : ''}`}>
                                                            <td className="py-2 px-4 text-[hsl(0,0%,8%)] font-bold">{index + 1}.{productIndex + 1}</td>
                                                            <td className="py-2 px-4">
                                                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover mx-auto" />
                                                            </td>
                                                            <td className="py-2 px-4 text-[#737373]">{product.name}</td>
                                                            <td className="py-2 px-4 text-[#737373]">Tk.{product.price}</td>
                                                            {productIndex === 0 && (
                                                                <>
                                                                    <td className="py-2 px-4 text-[#737373] uppercase">{order.tnxID}</td>
                                                                    <td className="py-2 px-4 text-[#737373] uppercase">{order.amount}</td>
                                                                    <td className="py-2 px-4 text-center text-black uppercase">
                                                                        <span className={`px-3 py-1 rounded text-white ${order.status === 'Shipped' ? 'bg-green-500' : 'bg-red-500'}`}>
                                                                            {order.status}
                                                                        </span>
                                                                        {/* {order.status} */}
                                                                    </td>
                                                                </>
                                                            )}
                                                        </tr>
                                                    ))
                                                ) : null
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="py-2 px-4 text-center">No orders found</td>
                                            </tr>
                                        )}
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

export default MyOrders;
