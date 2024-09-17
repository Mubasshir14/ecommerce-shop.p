import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import tik from '../assets/tik.png';


const Testimonials = () => {
    const [review, setReview] = useState([]);

    useEffect(() => {
        const fetchReview = async () => {
            const response = await axios.get('http://localhost:5000/review');
            setReview(response.data);
        }

        fetchReview();
    }, [])

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };


    return (
        <div className='p-2'>


            <h1 className='md:text-4xl text-2xl  uppercase font-extrabold text-center -mb-4'>OUR HAPPY CUSTOMERS</h1>
            <div className='mx-auto max-w-screen-xl h-[350px] flex  items-center  mb-20 px-2'>

                <Swiper
                    spaceBetween={30} 
                    navigation={true} 
                    modules={[Navigation]}
                    className="mySwiper"
                    breakpoints={{
                       
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20, 
                        },
                        
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10, 
                        },
                        
                        1024: {
                            slidesPerView: 3, 
                            spaceBetween: 10, 
                        },
                        
                        1224: {
                            slidesPerView: 3,
                            spaceBetween: 30, 
                        },
                    }}
                >
                    {
                        review.map((r, index) => (
                            <SwiperSlide key={index}>
                                <div className="p-4 border-2 rounded-lg shadow-xl  border-black bg-white xl:w-[400px] h-[240px] relative">
                                    <div className='flex flex-col space-y-3 justify-center p-8'>
                                        <p className="text-2xl">
                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={46}
                                                value={r.rating}
                                                activeColor="#ffd700"
                                            />
                                        </p>
                                        <h3 className="text-2xl font-extrabold flex gap-2">{r.name}
                                            <img src={tik} alt="" />
                                        </h3>
                                        <p>{r.review}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

            </div>
        </div>
    );
};

export default Testimonials;