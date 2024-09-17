import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import ProductCard from './ProductCard';

const TopSelling = () => {
    const [topSelling, setTopSelling] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArrival = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/product');
                setTopSelling(response.data);
            } catch (err) {
                console.error('Error fetching top selling:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchArrival();
    }, []);

    const topSell = topSelling.filter(item => item.subcategory === 'topsale');

    if (loading) return <Loader />;

    return (
        <div className="p-4">
            <div className='max-w-screen-xl mx-auto mt-20'>
                <h2 className='md:text-4xl text-2xl  uppercase font-extrabold text-center mb-4'>Top Sellings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        topSell.map(product =>
                            <ProductCard key={product._id} product={product} />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default TopSelling;
