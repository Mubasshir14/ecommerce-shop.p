import React, { useState, useEffect } from 'react';
import { FaShopware } from 'react-icons/fa';
import { FaShirt } from 'react-icons/fa6';
import { GiPirateCoat, GiPoloShirt, GiShorts, GiSkirt } from 'react-icons/gi';
import { PiPantsBold, PiShirtFoldedFill } from 'react-icons/pi';
import { RiPlayList2Fill } from 'react-icons/ri';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const ShopSidebar = ({onCategoryChange}) => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://ecommerce-shop-p-server.onrender.com/product');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const text = form.text.value.toLowerCase();

       
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(text) ||
            product.category.toLowerCase().includes(text) ||
            product.subcategory.toLowerCase().includes(text)
        );

     
        navigate('/search', { state: { results: filteredProducts } });
    };

    return (
        <div className='my-12'>
            <aside className="flex flex-col  w-64 h-screen  lg:min-h-screen px-4 py-8 overflow-y-auto  bg-white border-2 rounded-xl ">
                <div className='flex justify-between items-center px-2'>
                    <h1 className='text-2xl font-extrabold text-black'>Filter</h1>
                    <p className='text-2xl font-extralight text-black'><RiPlayList2Fill /></p>
                </div>
                <hr className='mt-3 border-2 border-black' />
                <form onSubmit={handleSearch} className="relative mt-6">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </span>

                    <input type="text" name='text' className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md   focus:border-blue-400  focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
                </form>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        <Link to='/shop'  className="flex items-center px-4 py-2 text-gray-700  rounded-md " >
                            <FaShopware className='w-5 h-5' />
                            <span className="mx-4 font-medium">All Products</span>
                        </Link>

                        <NavLink to='/tshirt' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <FaShirt className='w-5 h-5' />

                            <span className="mx-4 font-medium">T-Shirts</span>
                        </NavLink>


                        <NavLink to='/shirt' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <PiShirtFoldedFill className='w-5 h-5' />

                            <span className="mx-4 font-medium">Shirts</span>
                        </NavLink>

                        <NavLink to='/polo' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <GiPoloShirt className='w-5 h-5' />

                            <span className="mx-4 font-medium">Polo </span>
                        </NavLink>

                        <NavLink to='/shorts' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <GiShorts className='w-5 h-5' />

                            <span className="mx-4 font-medium">Shorts</span>
                        </NavLink>
                        <NavLink to='/jeans' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <PiPantsBold className='w-5 h-5' />

                            <span className="mx-4 font-medium">Jeans</span>
                        </NavLink>
                        <NavLink to='/tracsuits'  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <PiPantsBold className='w-5 h-5' />
                            <span className="mx-4 font-medium">Tracksuits</span>
                        </NavLink>
                        <NavLink to='/blazers'  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <GiPirateCoat className='w-5 h-5' />

                            <span className="mx-4 font-medium">Blazers</span>
                        </NavLink>
                        <NavLink to='/jersey' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <FaShirt className='w-5 h-5' />

                            <span className="mx-4 font-medium">Jerseys</span>
                        </NavLink>
                        <NavLink to='/sharees'  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <GiSkirt className='w-5 h-5' />

                            <span className="mx-4 font-medium">Sharee</span>
                        </NavLink>
                        <NavLink to='/gawn'  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <GiSkirt className='w-5 h-5' />

                            <span className="mx-4 font-medium">Gawn</span>
                        </NavLink>
                        <NavLink to='/kameez'  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <GiSkirt className='w-5 h-5' />

                            <span className="mx-4 font-medium">Salwar Kameez</span>
                        </NavLink>
                    </nav>

                    <hr className='mt-10 mb-6 border-2 border-black' />
                    <div className='flex justify-between items-center px-2'>
                        <h1 className='text-2xl font-extrabold text-black'>Dress Style</h1>
                        <p className='text-2xl font-extralight text-black'><RiPlayList2Fill /></p>
                    </div>

                    <div className=''>

                        <NavLink to ='/casual'  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <FaShirt className='w-5 h-5' />

                            <span className="mx-4 font-medium">Casual</span>
                        </NavLink>
                        <NavLink to='/formal' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <PiShirtFoldedFill className='w-5 h-5' />

                            <span className="mx-4 font-medium">Formal</span>
                        </NavLink>
                        <NavLink to='/party' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700" >
                            <GiPirateCoat className='w-5 h-5' />

                            <span className="mx-4 font-medium">Party</span>
                        </NavLink>
                        <NavLink to='/gym' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100   hover:text-gray-700 mb-3" >
                            <GiShorts className='w-5 h-5' />

                            <span className="mx-4 font-medium">Gym</span>
                        </NavLink>
                    </div>
                </div>
            </aside>

        </div>
    );
};

export default ShopSidebar;