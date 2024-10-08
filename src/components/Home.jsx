import React from 'react';
import Banner from './Banner';
import Brands from './Brands';
import Browse from './Browse';
import Newslrtter from './Newslrtter';
import Testimonials from './Testimonials';
import NewArrival from './NewArrival';
import TopSelling from './TopSelling';
import AllProduct from './AllProduct';

const Home = () => {
    return (
        <div>
            <Banner />
            <Brands />
            <div id='new-arrival'>
                <NewArrival />
            </div>
           <div id='top-selling'>
           <TopSelling />
           </div>
            <Browse />
            <div id='brand' className='max-w-screen-xl mx-auto mb-10'>
                <AllProduct />
            </div>
            <Newslrtter />
            <Testimonials />
        </div>
    );
};

export default Home;