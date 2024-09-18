import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaCartPlus, FaSearch } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { GrUserManager } from 'react-icons/gr';
import useCart from '../hooks/useCart';
import img from '../assets/9-768x768.jpg';
import useNotifications from '../hooks/useNotification';
import { IoIosNotifications } from 'react-icons/io';
import Notification from './Notification';

const Navbar = () => {
    const [products, setProducts] = useState([]);
    const [nav, setNav] = useState(false);
    const { user, logOut } = useAuth();
    const [cart] = useCart();
    const [userNotifications] = useNotifications();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const scrollToSection = (id) => {
        const section = document.querySelector(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNav = () => {
        setNav(!nav);
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown")) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/product');
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
        form.reset();
    };

    // Open the notification modal
    const openNotificationModal = () => {
        setIsNotificationOpen(true);
    };

    // Close the notification modal
    const closeNotificationModal = () => {
        setIsNotificationOpen(false);
    };

    return (
        <div className='border-b-2 border-black md:border-0'>
            <div className=" text-gray-400 h-[80px] mx-auto flex justify-between items-center md:px-4 md:border-b-2 border-b-black">
                <Link to='/' className="text-3xl font-bold text-black ml-4 font-cinzel">Shop.p</Link>
                <ul className="hidden lg:flex items-center ">
                    <li className="p-5 text-md text-black"><NavLink to='/shop'>Shop</NavLink></li>
                    <li to="#"
                    onClick={(e) => {
                        e.preventDefault();  
                        scrollToSection('#new-arrival');  
                    }} className="p-5 text-md text-black"><NavLink 
                    to='/new-arrival'
                    >New Arrival</NavLink></li>
                    <li to="#"
                        onClick={(e) => {
                            e.preventDefault();  
                            scrollToSection('#top-selling');  
                        }} className="p-5 text-md text-black"><NavLink
                        to='/top-selling'
                    >
                        Top Selling
                    </NavLink></li>
                   
                    <li className="p-5 text-lg text-black">
                        <NavLink>
                            <form onSubmit={handleSearch} className="relative ">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                                <input type="text" name='text' className="w-[250px] py-2 pl-10 pr-4 text-gray-700 bg-white border-b-black border-b-2 rounded-md focus:border-black focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
                            </form>
                        </NavLink>
                    </li>
                </ul>
                <div className='lg:flex items-center gap-4 hidden'>
                    <button style={{ position: 'relative', display: 'inline-block', color: 'black' }} onClick={openNotificationModal}>
                        <IoIosNotifications size={36} />
                        <span
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                backgroundColor: 'blue',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '5px 8px',
                                fontSize: '10px',
                            }}
                        >
                            +{userNotifications.length}
                        </span>
                    </button>

                    <Link to='/cart' style={{ position: 'relative', display: 'inline-block', color: 'black' }}>
                        <FaCartPlus size={36} />
                        <span
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                backgroundColor: 'red',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '5px 8px',
                                fontSize: '10px',
                            }}
                        >
                            +{cart.length}
                        </span>
                    </Link>

                    {user ? (
                        <div className="relative inline-block dropdown">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300 focus:ring focus:outline-none flex"
                            >
                                <svg className="w-5 h-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <img src={user?.photoURL || img} className='w-7 border-2 border-black rounded-full h-7' alt="" />
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl transition transform ease-out duration-100 scale-100">
                                    <Link to='/profile' className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                                        Your profile
                                    </Link>
                                    <Link to='/cart' className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                                        Carts
                                    </Link>
                                    <Link to='/orders' className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                                        Orders
                                    </Link>

                                    <button onClick={handleLogOut} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to='/login' className='border-2 rounded-full border-black p-2'>
                            <GrUserManager className='text-2xl text-black' />
                        </Link>
                    )}
                </div>
                <div className="flex gap-4 items-center lg:hidden mr-6 text-black">
                    <button style={{ position: 'relative', display: 'inline-block', color: 'black' }} onClick={openNotificationModal}>
                        <IoIosNotifications size={26} />
                        <span
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                backgroundColor: 'blue',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '5px 8px',
                                fontSize: '8px',
                            }}
                        >
                            +{userNotifications.length}
                        </span>
                    </button>

                    <Link to='/cart' style={{ position: 'relative', display: 'inline-block', color: 'black' }}>
                        <FaCartPlus size={26} />
                        <span
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                backgroundColor: 'red',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '5px 8px',
                                fontSize: '8px',
                            }}
                        >
                            +{cart.length}
                        </span>
                    </Link>
                    <div className="relative w-[7] inline-block dropdown">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300 focus:ring focus:outline-none flex"
                        >
                            <svg className="w-5 h-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <img src={user?.photoURL || img} className='w-7 border-2 border-black rounded-full h-7' alt="" />
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl transition transform ease-out duration-100 scale-100">
                                <Link to='/profile' className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                                    Your profile
                                </Link>
                                <Link to='/cart' className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                                    Carts
                                </Link>
                                <Link to='/orders' className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                                    Orders
                                </Link>

                                <button onClick={handleLogOut} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>

                    <AiOutlineMenu className="text-3xl text-black cursor-pointer" onClick={handleNav} />
                </div>

                {/* Mobile Menu */}
                <div className={nav ? 'lg:hidden fixed right-0 top-0 w-[60%] h-full bg-gray-100 border-l ease-in-out duration-500 z-50' : 'fixed right-[-100%]'}>
                    <div className="flex justify-end p-6">
                        <AiOutlineClose size={30} className="cursor-pointer" onClick={handleNav} />
                    </div>
                    <ul className="uppercase p-4">
                        <li className="p-4 border-b border-gray-400"><NavLink to='/shop' onClick={handleNav}>Shop</NavLink></li>
                        <li to="#"
                    onClick={(e) => {
                        e.preventDefault();  
                        scrollToSection('#new-arrival');  
                    }} className="p-5 text-md text-black"><NavLink 
                    to='/new-arrival'
                    >New Arrival</NavLink></li>
                    <li to="#"
                        onClick={(e) => {
                            e.preventDefault();  
                            scrollToSection('#top-selling');  
                        }} className="p-5 text-md text-black"><NavLink
                        to='/top-selling'
                    >
                        Top Selling
                    </NavLink></li>
                        <li className="p-4 border-b border-gray-400">
                            <form onSubmit={handleSearch} className="relative ">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaSearch className="text-gray-900" />
                                </span>
                                <input type="text" name='text' className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border-b-black border-b-2 rounded-md focus:border-black focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
                            </form>
                        </li>
                        {user ? (
                            <li className="p-4 border-b border-gray-400">
                                <Link to='/profile' onClick={handleNav}>Profile</Link>
                                <button onClick={handleLogOut} className="ml-4">Sign Out</button>
                            </li>
                        ) : (
                            <li className="p-4 border-b border-gray-400">
                                <Link to='/login' onClick={handleNav}>Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Notification Modal */}
            {isNotificationOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 "
                    onClick={closeNotificationModal}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-md w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeNotificationModal}
                        >
                            <AiOutlineClose size={24} />
                        </button>
                        <h2 className="text-xl font-semibold mb-4 text-center pb-3 border-b-2 border-black">Notifications</h2>
                        <Notification notifications={userNotifications} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;

