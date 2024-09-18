import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Loader from './Loader';

const AllProduct = () => {
    const [product, setProduct] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://ecommerce-shop-p-server.onrender.com/product');
                const products = response.data;
                sortProducts(products);
            } catch (err) {
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [sortOption]);


    const sortProducts = (products) => {
        let sortedProducts = [...products];
        switch (sortOption) {
            case 'priceLowToHigh':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'priceHighToLow':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'alphabetical':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'newest':
                sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            default:
                break;
        }
        setProduct(sortedProducts);
    };



    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(product.length / productsPerPage);


    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <Loader />;

    return (
        <div>
            <h1 className='md:text-4xl text-2xl  uppercase font-extrabold text-center mb-4'>All Products</h1>

            {/* Sorting Options */}
            <div className='flex justify-center mb-4'>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className='p-2 border rounded'
                >
                    <option value='default'>Default</option>
                    <option value='priceLowToHigh'>Low to High</option>
                    <option value='priceHighToLow'>High to Low</option>
                    <option value='alphabetical'>A-Z</option>
                    <option value='newest'>Newest First</option>
                </select>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2'>
                {
                    currentProducts.map(product => <ProductCard key={product._id} product={product} />)
                }
            </div>

            <div className='flex justify-center mt-5'>
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-base-200 text-gray-600' : 'bg-gray-300'}`}
                        >
                            {index + 1}
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export default AllProduct;
