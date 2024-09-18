import React, { useContext, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'; // Correct way to import the CSS

import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const SubmitReview = ({ user: propUser, productName, onReviewSubmitted }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire({
                title: 'Error!',
                text: 'You need to be logged in to submit a review.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const review = {
            rating,
            reviewText,
            productName,
            name: user.displayName // Include productId in the review object if needed
        };
        console.log(review);
        setIsLoading(true); // Set loading state before starting the request

        try {
            const response = await axios.post('https://ecommerce-shop-p-server.onrender.com/reviews', review);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your review has been submitted.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                if (typeof onReviewSubmitted === 'function') {
                    onReviewSubmitted();
                } else {
                    console.error('onReviewSubmitted is not a function');
                }
                setRating(0);
                setReviewText('');
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: `Error submitting review: ${error.response?.data || error.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLoading(false); // Reset loading state after request completes
        }
    };

    return (
        <div className="review-container bg-[#59C6D2] p-4 rounded">
            <form onSubmit={handleSubmit}>
                <div className="rating-section flex items-center mb-2">
                    <label htmlFor="rating" className="mr-2">Rating:</label>
                    <Rating
                        value={rating}
                        onChange={setRating}
                        style={{ maxWidth: 180 }} // Adjust width as needed
                    />
                </div>
                <div className="review-section flex items-center gap-3 mb-2">
                    <label htmlFor="review" className="mr-2">Your Review</label>
                    <input
                        id="review"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        type="text"
                        placeholder="Write your review here..."
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>
                <button
                    type="submit"
                    className={`submit-button bg-[#59C6D2] border-2 btn mt-2 text-white ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default SubmitReview;
