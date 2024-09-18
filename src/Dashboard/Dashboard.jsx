import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaFirstOrder, FaHome, FaProductHunt, FaUser } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { MdManageAccounts } from 'react-icons/md';
import { SiNginxproxymanager } from 'react-icons/si';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { FcStatistics } from 'react-icons/fc';


const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axios.get('https://ecommerce-shop-p-server.onrender.com/users');
                setUsers(response.data);
                

                const foundUser = response.data.find(u => u.email === user?.email);

                if (foundUser && foundUser.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }

            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchAdmin();
        }
    }, [user]);





    return (
        <div className='my-10 mb-36 max-w-screen-xl mx-auto'>
            <div className='flex flex-col'>
                <div className=' '>
                    {
                        isAdmin ?
                            <>
                                <div className='flex justify-between lg:justify-around border-b-2 border-black p-3 gap-3 overflow-x-auto'>

                                    <NavLink to='/manage-product' className='flex flex-col w-36  items-center gap-2 border-2 border-black rounded-md p-2'>
                                        <FaProductHunt className='text-2xl text-black' />
                                        <h1 className='text-xs text-black uppercase'>Manage Product</h1>
                                    </NavLink>
                                    <NavLink to='/add-product' className='flex flex-col w-36  items-center gap-2 border-2 border-black rounded-md p-2'>
                                        <FaProductHunt className='text-2xl text-black' />
                                        <h1 className='text-xs text-black uppercase'>Add Product</h1>
                                    </NavLink>
                                    <NavLink to='/manage-user' className='flex flex-col w-36  items-center gap-2 border-2 border-black rounded-md p-2'>
                                        <MdManageAccounts className='text-2xl text-black' />
                                        <h1 className='text-xs text-black uppercase'>Manage Users</h1>
                                    </NavLink>
                                    <NavLink to='/manage-order' className='flex flex-col w-36  items-center gap-2 border-2 border-black rounded-md p-2'>
                                        <SiNginxproxymanager className='text-2xl text-black' />
                                        <h1 className='text-xs text-black uppercase'>Manage Orders</h1>
                                    </NavLink>
                                    <NavLink to='/statistics' className='flex flex-col w-36  items-center gap-2 border-2 border-black rounded-md p-2'>
                                        <FcStatistics className='text-2xl text-black' />
                                        <h1 className='text-xs text-black uppercase'>Statistics</h1>
                                    </NavLink>
                                    <NavLink to='/cart' className='flex flex-col w-36  items-center gap-2 border-2 border-black rounded-md p-2'>
                                        <div style={{ position: 'relative', display: 'inline-block', color: 'black' }}>
                                            <FaCartPlus size={30} />

                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    top: '-10px',
                                                    right: '-10px',
                                                    backgroundColor: 'red',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    padding: '5px 4px',
                                                    fontSize: '10px',
                                                }}
                                            >
                                                +{cart.length}
                                            </span>

                                        </div>
                                        <h1 className='text-xs text-black uppercase'>My Cart</h1>
                                    </NavLink>
                                   
                                    <NavLink to='/orders' className='flex flex-col w-36  items-center gap-2 border-2 border-black rounded-md p-2'>
                                        <FaFirstOrder className='text-2xl text-black' />
                                        <h1 className='text-xs text-black uppercase'>My Order</h1>
                                    </NavLink>


                                </div>
                            </> :
                            <div className='flex justify-center border-b-2 border-black p-3 gap-3 overflow-x-auto'>
                                <NavLink to='/cart' className='flex flex-col w-36  items-center gap-2 border-2 border-black rounded-md p-2'>
                                    <div style={{ position: 'relative', display: 'inline-block', color: 'black' }}>
                                        <FaCartPlus size={30} />

                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '-10px',
                                                right: '-10px',
                                                backgroundColor: 'red',
                                                color: 'white',
                                                borderRadius: '50%',
                                                padding: '5px 4px',
                                                fontSize: '10px',
                                            }}
                                        >
                                            +{cart.length}
                                        </span>

                                    </div>
                                    <h1 className='text-xs text-black uppercase'>My Cart</h1>
                                </NavLink>
                                <NavLink to='/orders' className='flex flex-col w-36  items-center gap-2 border-2 border-black rounded-md p-2'>
                                    <FaFirstOrder className='text-2xl text-black' />
                                    <h1 className='text-xs text-black uppercase'>My Order</h1>
                                </NavLink>


                            </div>
                    }
                </div>
                <div className="flex-1 ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;