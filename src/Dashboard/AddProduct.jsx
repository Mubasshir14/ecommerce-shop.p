import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            // Image upload to imgbb and then get an URL
            const imageFile = { image: data.image[0] };
            const imageRes = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (imageRes.data.success) {
                const productItem = {
                    name: data.name,
                    category: data.category,
                    subcategory: data.subcategory,
                    price: parseFloat(data.sellingPrice),
                    deletePrice: parseFloat(data.deletePrice),
                    details: data.details,
                    colors: data.colors,
                    sizes: data.sizes,
                    image: imageRes.data.data.display_url
                };

                const productRes = await axios.post('https://ecommerce-shop-p-server.onrender.com/product', productItem);

                if (productRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} is added to the Product Collection.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

                navigate('/manage-product')
            }
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error occurred. Please try again.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <Dashboard/>
            <div className='flex items-center -mt-20 md:-mt-28 justify-center md:mb-20 p-2'>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-lg mt-6">

                {/* Form Fields */}

                {/* Product Name */}
                <label className="form-control w-full my-6">
                    <div className="label">
                        <span className="label-text text-gray-700">Product Name*</span>
                    </div>
                    <input {...register("name", { required: "Product Name is required" })} type="text" placeholder="Product Name" className="input input-bordered w-full" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </label>

                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Category Selection */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700">Category*</span>
                        </div>
                        <select defaultValue='default' {...register("category", { required: "Category is required" })} className="select select-bordered w-full">
                            <option disabled value='default'>Select category</option>
                            <option value="tshirt">T-Shirt</option>
                            <option value="polo">Polo Shirt</option>
                            <option value="jeans">Jeans</option>
                            <option value="shorts">Shorts</option>
                            <option value="shirt">Shirt</option>
                            <option value="blazers">Blazers</option>
                            <option value="panjabi">Panjabi</option>
                            <option value="tracksuits">Tracksuits</option>
                            <option value="jersey">Jerseys</option>
                            <option value="sharees">Sharees</option>
                            <option value="gawn">Gawn</option>
                            <option value="kameez">Salwar Kameez</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </label>

                    {/* Sub Category Selection */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700">Sub Category*</span>
                        </div>
                        <select defaultValue='default' {...register("subcategory", { required: "Subcategory is required" })} className="select select-bordered w-full">
                            <option disabled value='default'>Select subcategory</option>
                            <option value="casual">Casual</option>
                            <option value="formal">Formal</option>
                            <option value="party">Party</option>
                            <option value="gym">Gym</option>
                            <option value="topsale">Top Selling</option>
                            <option value="new">New Arrival</option>
                            <option value="blank">None</option>
                        </select>
                        {errors.subcategory && <p className="text-red-500 text-sm">{errors.subcategory.message}</p>}
                    </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Selling Price */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700">Selling Price*</span>
                        </div>
                        <input {...register("sellingPrice", { required: "Selling Price is required", valueAsNumber: true })} type="number" placeholder="Selling Price" className="input input-bordered w-full" />
                        {errors.sellingPrice && <p className="text-red-500 text-sm">{errors.sellingPrice.message}</p>}
                    </label>

                    {/* Discount Price */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700">Delete Price*</span>
                        </div>
                        <input {...register("deletePrice", { required: "Delete Price is required", valueAsNumber: true })} type="number" placeholder="Delete Price" className="input input-bordered w-full" />
                        {errors.deletePrice && <p className="text-red-500 text-sm">{errors.deletePrice.message}</p>}
                    </label>
                </div>

                {/* Product Details */}
                <label className="form-control w-full my-6">
                    <div className="label">
                        <span className="label-text text-gray-700">Product Details*</span>
                    </div>
                    <textarea {...register("details", { required: "Product Details are required" })} className="textarea textarea-bordered w-full" placeholder="Product Details"></textarea>
                    {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
                </label>

                {/* Color Selection */}
                <div className="form-control w-full my-6">
                <div className="label">
                        <span className="label-text text-gray-700">Available Color*</span>
                    </div>
                    <input {...register("colors")} type="text" placeholder="Enter colors (comma separated)" className="input input-bordered w-full" />
                </div>

                {/* Size Selection */}
                <div className="form-control w-full my-6">
                <div className="label">
                        <span className="label-text text-gray-700">Available Size*</span>
                    </div>
                    <input {...register("sizes")} type="text" placeholder="Enter sizes (comma separated)" className="input input-bordered w-full" />
                </div>

                {/* File Input for Images */}
                <div className="form-control w-full my-6">
                    <input {...register("image", { required: "Image is required" })} type="file" accept="image/*" className="file-input w-full" />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full my-6 text-white p-2 rounded flex items-center justify-center gap-2 bg-black">
                    Add Product
                </button>
            </form>
        </div>
        </div>
    );
};

export default AddProduct;
