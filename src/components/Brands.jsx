import React from 'react';

const Brands = () => {
    return (
        <div className='bg-black gap-4 p-2 flex flex-wrap justify-around h-[100px] items-center'>
            <div>
                <h1 className='md:text-4xl text-2xl text-white font-cinzel'>VERSACE</h1>
            </div>
            <div>
                <h1 className='md:text-4xl text-2xl text-white font-cinzel'>zARA</h1>
            </div>
            <div>
                <h1 className='md:text-4xl text-2xl text-white font-cinzel'>gUCCI</h1>
            </div>
            <div>
                <h1 className='md:text-4xl text-2xl text-white font-cinzel'>PRADA</h1>
            </div>
            <div>
                <h1 className='md:text-4xl text-2xl text-white font-cinzel'>CALVIN KLEIN</h1>
            </div>
        </div>
    );
};

export default Brands;