import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ShopSidebar from './ShopSidebar';
import { FaFilter } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [sortOption, setSortOption] = useState('default');
    const [sortedResults, setSortedResults] = useState([]);
    const location = useLocation();
    const { results } = location.state || { results: [] };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Function to handle sorting
    const handleSort = (option) => {
        setSortOption(option);
    };

    useEffect(() => {
        let sortedArray = [...results];
        switch (sortOption) {
            case 'priceLowToHigh':
                sortedArray.sort((a, b) => a.price - b.price);
                break;
            case 'priceHighToLow':
                sortedArray.sort((a, b) => b.price - a.price);
                break;
            case 'alphabetical':
                sortedArray.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'newest':
                sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            default:
                break;
        }
        setSortedResults(sortedArray);
    }, [results, sortOption]);

    return (
        <div>
            <div className='max-w-screen-xl mx-auto'>
                <div className='lg:flex lg:gap-8'>
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
                        <h1 className='md:text-4xl text-2xl uppercase font-extrabold text-center mb-4'>Your Search Result</h1>

                        {/* Sorting Dropdown */}
                        <div className='flex justify-center mb-4'>
                            <select
                                value={sortOption}
                                onChange={(e) => handleSort(e.target.value)}
                                className='p-2 border border-gray-300 rounded'
                            >
                                <option value='default'>Default</option>
                                <option value='priceLowToHigh'>Low to High</option>
                                <option value='priceHighToLow'>High to Low</option>
                                <option value='alphabetical'>A-Z</option>
                                <option value='newest'>Newest First</option>
                            </select>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                            {sortedResults.length > 0 ? (
                                sortedResults.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            ) : (
                                <p>No results found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
