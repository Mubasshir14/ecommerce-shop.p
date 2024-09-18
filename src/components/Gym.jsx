import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Loader from './Loader';
import ShopSidebar from './ShopSidebar';
import { FaFilter } from 'react-icons/fa';

const Gym = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://ecommerce-shop-p-server.onrender.com/product');
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);


    const filterProduct = product.filter(s => s.subcategory === 'gym');
    if (loading) return <Loader />;
    return (
        <div>
        <div className='max-w-screen-xl mx-auto'>
            <div className='lg:flex  lg:gap-8'>
            <div className='flex justify-between items-center p-4'>
                    <div></div> {/* Empty div for spacing */}
                    <button
                        className='block lg:hidden p-2 bg-gray-200 rounded-lg'
                        onClick={toggleDrawer}
                    >
                        <h1 className='flex gap-2 text-xl items-center'>
                            Filter <FaFilter className='text-xl' />
                        </h1>
                    </button>
                </div>


                {/* Sidebar for desktop and Drawer for mobile, sliding from right */}
                <div className={`fixed inset-y-0 right-0 z-50 transition-transform transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} lg:relative lg:translate-x-0 lg:block`}>
                    <div className='fixed inset-0 lg:hidden' onClick={toggleDrawer}></div>
                    <div className='bg-white w-64 min-h-screen lg:min-h-auto overflow-y-auto lg:relative lg:w-auto'>
                        <ShopSidebar />
                    </div>
                </div>

                {/* Product Content */}
                <div className='flex-1 lg:mt-12 mb-6 p-2'>

                    <h1 className='md:text-4xl text-2xl  uppercase font-extrabold text-center mb-4'>Gym Clothes</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {filterProduct.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
       
    </div>
    );
};

export default Gym;