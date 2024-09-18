import React from 'react';
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../hooks/useAuth';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const navigate = useNavigate('/')
    const { googleSignIn } = useAuth();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email
                }
                axios.post('https://ecommerce-shop-p-server.onrender.com/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
            })
    }
    return (
        <div>
            <button

                onClick={handleGoogleSignIn}
                className='disabled:cursor-not-allowed w-full mx-auto cursor-pointer flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded '>
                <FcGoogle size={32} />

                <p>Continue with Google</p>
            </button>
        </div>
    );
};

export default SocialLogin;