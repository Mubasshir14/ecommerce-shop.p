import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { FaCartShopping } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import Loader from './Loader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import tik from '../assets/tik.png';
import Newslrtter from './Newslrtter';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import StarRatings from 'react-star-ratings';
import useReview from '../hooks/useReview';
import Modal from 'react-modal';
import SubmitReview from './SubmitReview';





// Custom styles for the modal
const modalStyles = {
    content: {
        top: '60%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '500px',
        backgroundColor: '#59C6D2', // Background color
        color: 'black', // Text color for better contrast
        padding: '20px', // Padding inside the modal
        borderRadius: '8px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for better visibility
    },
};
const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('product-details');
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [reviews, refetchReviews] = useReview();

    // Color selection handler
    const handleSelectColor = (color) => {
        setSelectedColor(color);
    };

    // Size selection handler
    const handleSelectSize = (size) => {
        setSelectedSize(size);
    };



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://ecommerce-shop-p-server.onrender.com/product/${id}`);

                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to fetch product details. Please try again.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Loader />;

    if (!product) {
        return <div>Product not found</div>;
    }

    // add to cart
    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please select both color and size before adding to the cart.',
            });
            return;
        }

        if (user && user.email) {
            const cartItem = {
                productId: product._id,
                email: user.email,
                name: product.name,
                price: product.price,
                image: product.image,
                color: selectedColor, // Add selected color
                size: selectedSize // Add selected size
            };

            axios.post('https://ecommerce-shop-p-server.onrender.com/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${product.name} Added To The Cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to add item to cart. Please try again.',
                    });
                });
        } else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add items to the cart.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };


    const images = [
        {
            original: product.image,
            thumbnail: product.image,
        },
        {
            original: product.image,
            thumbnail: product.image,
        },
        {
            original: product.image,
            thumbnail: product.image,
        },
    ];


    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleReviewSubmitted = () => {
        refetchReviews(); // Refetch reviews to ensure the latest data is shown
        closeModal(); // Close modal after review submission
    };

    // Filter reviews to show only the one matching the product name
    const productReview = reviews.filter(review => review.productName === product.name);

    // Splitting colors and sizes into arrays
    const colors = product.colors.split(',').map(color => color.trim());
    const sizes = product.sizes.split(',').map(size => size.trim());

    return (
        <div className='max-w-screen-xl mx-auto mt-100 p-4 md:p-8'>
            <div className='flex flex-col md:flex-row'>
                <div className='flex-1 mb-6 md:mb-0'>
                    <ImageGallery
                        items={images}
                        showFullscreenButton={true}
                        additionalClass="custom-image-gallery"
                    />
                </div>
                <div className='flex-1 md:ml-8'>
                    <h1 className="md:text-4xl text-2xl text-black font-extrabold mb-4">
                        {product.name}
                    </h1>
                    <div className='flex gap-8'>
                        <p className="text-xl font-bold mb-4">
                            <span className=''>$ </span>
                            {product.price}
                        </p>
                        <p className="text-xl font-bold mb-4 line-through text-black/20">
                            <span className=''>$ </span>
                            {product.deletePrice}
                        </p>
                    </div>
                    <p className="text-lg mb-4 text-gray-900/50">
                        {product.details}
                    </p>

                    <div className="mb-4">
                        <p className="text-xl text-gray-900/50 font-normal mb-2">
                            Select Colors
                        </p>
                        <div className='flex gap-2 uppercase'>
                            {colors.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectColor(color)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition uppercase 
                    ${selectedColor === color ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-xl text-gray-900/50 font-normal mb-2">
                            Select Sizes
                        </p>
                        <div className='flex gap-2 uppercase'>
                            {sizes.map((size, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectSize(size)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition uppercase 
                    ${selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                    {size.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>


                    <button
                        onClick={handleAddToCart}
                        className="bg-black w-full p-4 rounded-lg flex items-center justify-center gap-2 font-bold text-white md:text-2xl"
                    >
                        Add To Cart
                        <FaCartShopping className='text-2xl text-white' />
                    </button>
                </div>

            </div>

            {/* Review Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Review Modal"
            >
                <h2 className="text-xl font-bold mb-4 text-center">Submit Your Review</h2>
                <SubmitReview user={user}
                    productName={product.name} onReviewSubmitted={handleReviewSubmitted} />
                <div className='flex justify-end'>
                    <button
                        onClick={closeModal}
                        className="mt-4 py-2 px-4 rounded border border-gray-300"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            <div className='flex items-center justify-start  mt-10'>
                <Tabs>
                    <TabList className="flex  border-gray-300">
                        <Tab
                            onClick={() => setActiveTab('product-details')}
                            className={`py-2 px-4 text-lg font-semibold cursor-pointer 
          ${activeTab === 'product-details' ? 'border-b-2 border-blue-600 text-blue-600' : 'hover:text-blue-600'} 
          focus:outline-none`}
                        >
                            Product Details
                        </Tab>
                        <Tab
                            onClick={() => setActiveTab('reviews')}
                            className={`py-2 px-4 text-lg font-semibold cursor-pointer 
          ${activeTab === 'reviews' ? 'border-b-2 border-blue-600 text-blue-600' : 'hover:text-blue-600'} 
          focus:outline-none`}
                        >
                            Reviews
                        </Tab>
                        <Tab
                            onClick={() => setActiveTab('faq')}
                            className={`py-2 px-4 text-lg font-semibold cursor-pointer 
          ${activeTab === 'faq' ? 'border-b-2 border-blue-600 text-blue-600' : 'hover:text-blue-600'} 
          focus:outline-none`}
                        >
                            FAQ
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div className="my-6">
                            <table className="min-w-full table-auto border-collapse border border-gray-300 my-6">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-32">Size</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold ">Chest (Round)</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-32">Length</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold w-32">Sleeve</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">XS</td>
                                        <td className="border border-gray-300 px-4 py-2">36</td>
                                        <td className="border border-gray-300 px-4 py-2">26</td>
                                        <td className="border border-gray-300 px-4 py-2">7.5</td>
                                    </tr>
                                    <tr className="bg-gray-50 hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">S</td>
                                        <td className="border border-gray-300 px-4 py-2">37</td>
                                        <td className="border border-gray-300 px-4 py-2">26</td>
                                        <td className="border border-gray-300 px-4 py-2">7.75</td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">M</td>
                                        <td className="border border-gray-300 px-4 py-2">39</td>
                                        <td className="border border-gray-300 px-4 py-2">27.5</td>
                                        <td className="border border-gray-300 px-4 py-2">8.5</td>
                                    </tr>
                                    <tr className="bg-gray-50 hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">L</td>
                                        <td className="border border-gray-300 px-4 py-2">40.5</td>
                                        <td className="border border-gray-300 px-4 py-2">28</td>
                                        <td className="border border-gray-300 px-4 py-2">8.75</td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">XL</td>
                                        <td className="border border-gray-300 px-4 py-2">43</td>
                                        <td className="border border-gray-300 px-4 py-2">29</td>
                                        <td className="border border-gray-300 px-4 py-2">9</td>
                                    </tr>
                                    <tr className="bg-gray-50 hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">2XL</td>
                                        <td className="border border-gray-300 px-4 py-2">45</td>
                                        <td className="border border-gray-300 px-4 py-2">30</td>
                                        <td className="border border-gray-300 px-4 py-2">9.25</td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">3XL</td>
                                        <td className="border border-gray-300 px-4 py-2">47.5</td>
                                        <td className="border border-gray-300 px-4 py-2">30.5</td>
                                        <td className="border border-gray-300 px-4 py-2">9.5</td>
                                    </tr>
                                    <tr className="bg-gray-50 hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">4XL</td>
                                        <td className="border border-gray-300 px-4 py-2">50</td>
                                        <td className="border border-gray-300 px-4 py-2">31</td>
                                        <td className="border border-gray-300 px-4 py-2">10</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3'>
                            {productReview.map((review, index) => (
                                <div key={index} className="p-6 border-2 rounded-lg shadow-xl border-black bg-white transition-transform transform hover:scale-105">
                                    <div className="flex items-center mb-4">

                                        <StarRatings
                                            rating={review.rating}
                                            starRatedColor="gold"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension='26px'
                                            starSpacing='2px'
                                        />
                                    </div>
                                    <p className="text-md mb-2"> {review.reviewText}</p>
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        {review.name}
                                        <img src={tik} alt="Verified" className="w-6 h-6" />
                                    </h3>
                                    <p className="text-md text-gray-600">Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            <button
                                onClick={openModal}
                                className='border-2 border-black text-black px-4 py-2 rounded-lg mt-2'
                            >
                                Add Review
                            </button>
                        </div>

                    </TabPanel>
                    <TabPanel>
                    <section className="">
	<div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
		<p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
		<h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
		<div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
			<div>
				<h3 className="font-semibold">What payment methods do you accept?</h3>
				<p className="mt-1 ">We accept a variety of payment methods, including credit/debit cards, PayPal, and major digital wallets. You can also use store credit or promotional codes during checkout.</p>
			</div>
			<div>
				<h3 className="font-semibold">How long does shipping take?</h3>
				<p className="mt-1 ">Shipping times depend on your location. Domestic orders usually arrive within 3-5 business days, while international orders may take 7-14 business days. Expedited shipping options are also available at checkout.</p>
			</div>
			<div>
				<h3 className="font-semibold">Can I return or exchange an item?</h3>
				<p className="mt-1 ">Yes, we have a 30-day return policy. If you're not satisfied with your purchase, you can return or exchange it within 30 days of receiving the item, as long as it’s in its original condition. Check our return policy page for more details.</p>
			</div>
			<div>
				<h3 className="font-semibold">How can I track my order?</h3>
				<p className="mt-1 ">Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order through our website or the carrier’s site. If you have any issues, feel free to contact our support team.</p>
			</div>
		</div>
	</div>
</section>

                    </TabPanel>
                </Tabs>
            </div>



            <div className='mt-10'>
                <Newslrtter />
            </div>
        </div>
    );
};

export default ProductDetails;
