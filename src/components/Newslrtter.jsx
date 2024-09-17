import React from 'react';

const Newslrtter = () => {
    return (
        <div className='p-2'>
            <div className='bg-black max-w-screen-xl  mx-auto rounded-lg mb-20 '>
            <div className='flex md:flex-row flex-col justify-around items-center md:h-[150px] px-8'>
                <div>
                    <h1 className='md:text-4xl text-xl font-extrabold  text-white p-2 mb-3 md:mb-0'>STAY UPTO DATE ABOUT <br /> OUR LATEST OFFERS</h1>
                </div>
                <div className='flex flex-col gap-3
                 pb-2 md:pb-0'>
                    <label className="input input-bordered rounded-3xl flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" className="grow" placeholder="Email" />
                    </label>
                    <input type="button" value="Subscribe To Newsletter" className='btn
                    bg-white text-black rounded-3xl ' />
                </div>
            </div>
        </div>
        </div>
    );
};

export default Newslrtter;