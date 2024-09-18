import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import Loader from '../components/Loader';

const OrderDetails = () => {
    const { tnxID } = useParams(); 
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`https://ecommerce-shop-p-server.onrender.com/payment/${tnxID}`);
                setOrder(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [tnxID]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Order Details', 10, 10);
        
        // Order Information
        doc.text(`Order ID: ${order.tnxID}`, 10, 20);
        doc.text(`Status: ${order.status}`, 10, 30);
        doc.text(`Amount: $${order.amount}`, 10, 40);
        doc.text(`Created At: ${new Date(order.createdAt).toLocaleString()}`, 10, 50);
        doc.text(`Name: ${order.name}`, 10, 60);
        doc.text(`Email: ${order.email}`, 10, 70);
        doc.text(`Address: ${order.address}`, 10, 80);
        
        // Cart Items
        doc.text('Cart Items:', 10, 90);
        order.cart.forEach((item, index) => {
            const y = 100 + index * 30;
            doc.text(`Product Name: ${item.name}`, 10, y);
            doc.text(`Price: $${item.price}`, 10, y + 10);
            doc.text(`Color: ${item.color}`, 10, y + 20);
            doc.text(`Size: ${item.size}`, 10, y + 30);
        });

        doc.save('order-details.pdf');
    };

    if (loading) return <Loader/>;
    if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Order Details</h1>
                {order ? (
                    <>
                        <div className="mb-6">
                            <p className="mb-2 uppercase"><strong>Order ID:</strong> {order.tnxID}</p>
                            <p className="mb-2 uppercase"><strong>Status:</strong> {order.status}</p>
                            <p className="mb-2 uppercase"><strong>Amount:</strong> ${order.amount}</p>
                            <p className="mb-2 uppercase"><strong>Name:</strong> {order.name}</p>
                            <p className="mb-2 "><strong className='uppercase'>Email:</strong> {order.email}</p>
                            <p className="mb-2 uppercase"><strong>Address:</strong> {order.address}</p>
                        </div>

                        <h2 className="text-xl font-semibold mb-4">Cart Items:</h2>
                        {order.cart.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {order.cart.map(item => (
                                    <div key={item._id} className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
                                        <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-md mb-4" />
                                        <div className="text-sm">
                                            <p className="font-semibold mb-1"><strong>Product Name:</strong> {item.name}</p>
                                            <p className="mb-1"><strong>Price:</strong> ${item.price}</p>
                                            <p className="mb-1"><strong>Color:</strong> {item.color}</p>
                                            <p className="mb-1"><strong>Size:</strong> {item.size}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center">No items in cart.</p>
                        )}
                        
                        <button
                            onClick={downloadPDF}
                            className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-lg w-full hover:bg-blue-600"
                        >
                            Download
                        </button>
                    </>
                ) : (
                    <p className="text-center">No order details available.</p>
                )}
            </div>
        </div>
    );
};

export default OrderDetails;
