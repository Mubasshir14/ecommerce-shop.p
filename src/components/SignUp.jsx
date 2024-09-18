import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import useAuth from '../hooks/useAuth';
import { imageUpload } from '../api/utils';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUp = () => {
    const { createUser, updateUserProfile, loading, setLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];

        try {
            setLoading(true);
            const image_url = await imageUpload(image);

            
            const result = await createUser(email, password);
            await updateUserProfile(name, image_url);

           
            const newUser = {
                name,
                email,
                image_url,
                uid: result.user.uid, 
            };

         
            const response = await axios.post('https://ecommerce-shop-p-server.onrender.com/users', newUser);

            if (response.status === 200) {
                
                navigate('/');
                toast.success('Signup Successful');
            } else {
                throw new Error('Failed to save user data');
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                    <p className='text-sm text-gray-400'>Welcome to SHOP.P</p>
                </div>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='name' className='block mb-2 text-sm'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block mb-2 text-sm'>
                                Password
                            </label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>
                    <div>
                        <button type='submit' className='bg-rose-500 w-full rounded-md py-3 text-white'>
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 bg-gray-700'></div>
                    <p className='px-3 text-sm text-gray-400'>
                        Signup with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 bg-gray-700'></div>
                </div>

                <SocialLogin />
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account?{' '}
                    <Link to='/login' className='hover:underline hover:text-rose-500 text-gray-600'>
                        Login
                    </Link>.
                </p>
            </div>
        </div>
    );
};

export default SignUp;
