import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';

const ManageOrder = () => {
    const [order, setOrder] = useState([]);
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get('http://localhost:5000/payment');
                setOrder(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrder();
    }, []);
    



    const handleStatusUpdate = async (tnxID, newStatus) => {
        try {
            const response = await axios.patch(`http://localhost:5000/payment/${tnxID}`, {
                status: newStatus
            });

            setOrder(prevOrders => prevOrders.map(order =>
                order.tnxID === tnxID ? { ...order, status: newStatus } : order
            ));
            const updatedOrder = order.find(o => o.tnxID === tnxID);

            await axios.post('http://localhost:5000/notifications', {
                userID: updatedOrder.email,
                message: `Your order (${tnxID}) status has been updated to ${newStatus}.`,
                date: new Date().toISOString(),
                
            });
            console.log(message);

        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    if(loading)  return <Loader/>

    return (
        <div>
            <Dashboard />
            <div className='max-w-screen-xl mx-auto -mt-20 md:-mt-28'>
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
                                            <td className="py-2 px-4 uppercase font-bold">Action</td>
                                            <td className="py-2 px-4 uppercase font-bold">View</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.length > 0 ? order.map((order, index) => (
                                            order.cart && Array.isArray(order.cart) && order.cart.map((product, productIndex) => (
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
                                                                <span className={`px-3 py-1 rounded text-white ${order.status === 'Shipped' ? 'bg-green-500' : order.status === 'Cancel' ? 'bg-red-500' : 'bg-blue-500'}`}>
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                            <td className="py-2 px-4 flex flex-col gap-2 text-[#737373] uppercase">
                                                                <button 
                                                                    className="btn flex items-center border-green-600 btn-xs border-2 font-bold rounded-md"
                                                                    onClick={() => handleStatusUpdate(order.tnxID, 'Shipped')}
                                                                    disabled={order.status === 'Shipped' || order.status === 'Cancel'}
                                                                >
                                                                    <FcApprove className='text-xl ' />
                                                                </button>
                                                                <button 
                                                                    className="btn flex items-center border-red-600 btn-xs border-2 font-bold rounded-md"
                                                                    onClick={() => handleStatusUpdate(order.tnxID, 'Cancel')}
                                                                    disabled={order.status === 'Shipped' || order.status === 'Cancel'}
                                                                >
                                                                    <FcDisapprove className='text-xl ' />
                                                                </button>
                                                            </td>
                                                            <td className="py-2 px-4 text-[#737373] uppercase">
    <Link to={`/payment/${order.tnxID}`}><FaEye/></Link>
</td>

                                                        </>
                                                    )}
                                                </tr>
                                            ))
                                        )) : (
                                            <tr>
                                                <td colSpan="8" className="py-4 text-center text-gray-500">No orders found.</td>
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

export default ManageOrder;
