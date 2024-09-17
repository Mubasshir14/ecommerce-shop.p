import { useState, useEffect, useCallback, useRef } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import visa from '../assets/visa.webp';

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();
    const { orderDetails } = location.state || {};
    const { cart, displayPrice, name, email, address } = orderDetails || {};
    const [clientSecret, setClientSecret] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    // const hasFetchedClientSecret = useRef(false);

    const fetchClientSecret = useCallback(async (displayPrice, orderDetails) => {
        // if (hasFetchedClientSecret.current || !orderDetails) return;

        try {
            const response = await axios.post('http://localhost:5000/create-payment-intent', {
                amount: displayPrice,
                ...orderDetails,
            });

            setClientSecret(response.data.clientSecret);
            // hasFetchedClientSecret.current = true;
        } catch (err) {
            setError(err.message);
            console.error("Error fetching client secret:", err);
        }
    }, [orderDetails, cart, displayPrice]);

    useEffect(() => {
        if (displayPrice && orderDetails) {
            fetchClientSecret(displayPrice, orderDetails);
        }
    }, [displayPrice, orderDetails]);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        if (isButtonDisabled || isProcessing || !stripe || !elements) return;
        setIsButtonDisabled(true);
        setIsProcessing(true);
        setError(null);

        console.log('Payment processing started...', Date.now());

        try {
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { name, email, address: { line1: address } },
                },
            });

            console.log(`Client secret: ${clientSecret}`);

            if (paymentIntent.status === 'succeeded') {
                // objet create all data orderDetails 
                try{
                    await axios.post('http://localhost:5000/payment', {
                        amount: displayPrice,
                        ...orderDetails,
                        tnxID: paymentIntent.id 
                    });
                    Swal.fire({
                        title: 'Payment Successful!',
                        text: 'Your payment was processed successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    })
                        navigate('/payment-success', { state: { orderDetails, paymentIntent } });
                 
                }
                catch(err){
                    console.log(err);
                }
    
               
            } else if (error) {
                setError(error.message);
            } else {
                setError("Payment was not successful. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsProcessing(false);
            setIsButtonDisabled(false);
        }
    };

    return (
        <div className='p-2'>
            <div className='flex items-center justify-center min-h-[calc(100vh-150px)]'>
                <div className="payment-form border-2 border-black p-4 rounded-lg bg-gray-800/10">
                    <form onSubmit={handlePayment} className='space-y-4'>
                        <img src={visa} className='w-80' alt="Visa Logo" />
                        <h2 className='text-center font-bold text-xl'>Total Price: ${displayPrice}</h2>
                        <CardElement className='border-2 p-4 rounded-lg border-black' />
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            disabled={!stripe || isProcessing || isButtonDisabled}
                            className={`pay-now-button btn btn-outline w-full `}
                        >
                            Pay Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;