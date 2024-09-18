import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import ProductCard from './ProductCard';

const NewArrival = () => {
    const [newArrival, setNewArrival] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArrival = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://ecommerce-shop-p-server.onrender.com/product');
                setNewArrival(response.data);
            } catch (err) {
                console.error('Error fetching new arrivals:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchArrival();
    }, []);

    const newProduct = newArrival.filter(item => item.subcategory === 'new');

    if (loading) return <Loader />;

    return (
        <div className="p-4">
            <div className='max-w-screen-xl mx-auto mt-20 mb-20'>
                <h2 className='md:text-4xl text-2xl  uppercase font-extrabold text-center mb-4'>New Arrivals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        newProduct.map(product =>
                            <ProductCard key={product._id} product={product} />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default NewArrival;
