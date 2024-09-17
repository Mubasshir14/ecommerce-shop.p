import React from 'react';
import c from '../assets/c.png';
import f from '../assets/f.png';
import p from '../assets/p.png';
import g from '../assets/g.png';
import { Link } from 'react-router-dom';

const Browse = () => {
    return (
        <div className='p-2'>
            <div className="bg-base-200 rounded-lg max-w-screen-xl mx-auto my-16 p-4 md:p-8">
                <h1 className='md:text-4xl text-2xl uppercase font-extrabold text-center mb-6'>BROWSE BY dress STYLE</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">

                    {/* Column 1 */}
                    <Link to='/casual' className="relative md:col-span-1">
                        <img src={c} alt="Image C" className="w-full h-auto object-cover rounded-lg shadow-lg" />
                        <p className='absolute top-2 left-2  font-bold text-black md:text-xl px-2 py-1 rounded'>Casual</p>
                    </Link>

                    {/* Column 2 */}
                    <Link to='/formal' className="relative md:col-span-2">
                        <img src={f} alt="Image F" className="w-full h-auto object-cover rounded-lg shadow-lg" />
                        <p className='absolute top-2 left-2  font-bold text-black md:text-xl px-2 py-1 rounded'>Formal</p>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-6">

                    {/* Column 3 */}
                    <Link to='/party' className="relative md:col-span-2">
                        <img src={p} alt="Image P" className="w-full h-auto object-cover rounded-lg shadow-lg" />
                        <p className='absolute top-2 left-2  font-bold text-black md:text-xl px-2 py-1 rounded'>Party</p>
                    </Link>

                    {/* Column 4 */}
                    <Link to='/gym' className="relative md:col-span-1">
                        <img src={g} alt="Image G" className="w-full h-auto object-cover rounded-lg shadow-lg" />
                        <p className='absolute top-2 left-2  font-bold text-black md:text-xl px-2 py-1 rounded'>Gym</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Browse;
