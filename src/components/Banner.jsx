import React from 'react';
import h from '../assets/h.png';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <div className="bg-base-200 mt-2 md:mt-0 md:border-none border-t-2 border-t-black">

                <div className="flex flex-col md:flex-row md:gap-16 lg:gap-32 px-4 md:px-16 lg:px-24 py-6">

                    {/* Text Section */}
                    <div className="flex flex-col justify-center md:w-1/2 space-y-6 p-2">
                        <h1 className="text-3xl lg:text-5xl font-bold lg:font-extrabold text-center md:text-left">
                            FIND CLOTHES THAT MATCH YOUR STYLE
                        </h1>
                        <p className="text-sm md:text-lg text-center md:text-left">
                            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <Link to='/shop' className="btn btn-outline">Shop Now</Link>
                        </div>

                        {/* Stats Section */}
                        <div className="flex justify-center md:justify-start gap-6 md:gap-8">
                            <div className="flex flex-col items-center md:items-start space-y-2 p-2 border-r-2 border-r-gray-300">
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold">200+</h1>
                                <p className="text-xs md:text-sm font-bold">International Brands</p>
                            </div>
                            <div className="flex flex-col items-center md:items-start space-y-2 p-2 border-r-2 border-r-gray-300">
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold">2000+</h1>
                                <p className="text-xs md:text-sm font-bold">High-Quality Products</p>
                            </div>
                            <div className="flex flex-col items-center md:items-start space-y-2 p-2">
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold">30,000+</h1>
                                <p className="text-xs md:text-sm font-bold">Happy Customers</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex-1 mt-6 md:mt-0 flex justify-center">
                        <img src={h} alt="Fashion Banner" className="max-w-full h-auto object-cover rounded-lg  md:w-[80%] lg:w-full" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;
