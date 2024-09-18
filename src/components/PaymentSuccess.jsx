import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import useCart from '../hooks/useCart';

// Ensure the app element is set for accessibility purposes
Modal.setAppElement('#root');

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderDetails, paymentIntent } = location.state || {};
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const closeModal = () => setModalIsOpen(false);

    const { tranId } = useParams();
    const [cart, refetch] = useCart();

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://ecommerce-shop-p-server.onrender.com/carts/${id}`);
            if (response.data.deletedCount > 0) {
                refetch(); 
                console.log(`Item ${id} deleted from cart.`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (orderDetails && paymentIntent) {
            // Delete each item from the cart after successful payment
            orderDetails.cart.forEach((item) => handleDelete(item._id));
            Swal.fire({
                title: "Success!",
                text: "Your payment has been completed, and items have been removed from the cart.",
                icon: "success",
            });
        }
    }, [orderDetails, paymentIntent]);

    return (
        <div className='min-h-[calc(100vh-150px)]'>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Payment Success"
                className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-50"
                overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
            >
                <div className="bg-green-400/60 text-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                    <h2 className="text-2xl font-semibold mb-4">Payment Successful!</h2>
                    {orderDetails && paymentIntent ? (
                        <>
                            <p className="mb-4 text-lg">Thank you for your purchase, <strong>{orderDetails.name}</strong>!</p>
                            <p className="mb-4 text-lg">Your order number is: <strong>{paymentIntent.id}</strong></p>
                            <h3 className="text-xl font-semibold mb-2">Order Details:</h3>
                            <ul className="list-disc pl-5 mb-4">
                                {orderDetails.cart.map((item, index) => (
                                    <li key={index} className="text-lg">
                                        {item.name} - ${item.price}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-lg font-semibold">Total Price: ${orderDetails.displayPrice}</p>
                            <div className='flex justify-between'>
                                <Link to='/orders'
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    My Order
                                </Link>
                                <Link to='/'
                                    onClick={closeModal}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Close
                                </Link>
                            </div>
                        </>
                    ) : (
                        <p>No payment details found.</p>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default PaymentSuccess;
