import React, { useState } from 'react';
import ShopSidebar from './ShopSidebar';
import AllProduct from './AllProduct';
import { FaFilter } from 'react-icons/fa';

const ShopDashboard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
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
                <div className='flex-1 lg:mt-12 mb-6'>
                    <AllProduct />
                </div>
            </div>
        </div>
    );
};

export default ShopDashboard;
