import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className="flex flex-col items-center justify-center w-full  mx-auto ">
            <div
                className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md border-2 border-black"
                style={{ backgroundImage: `url(${product.image})` }} 
            ></div>

            <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 border-2 border-black">
                <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase h-14">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between px-3 py-2 bg-gray-200 ">
                    <span className="font-bold text-gray-800 dark:text-gray-200">$ {product.price}</span>
                    <span className="text-xs font-semibold text-gray-500  line-through">
                        $ {product.deletePrice} 
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
