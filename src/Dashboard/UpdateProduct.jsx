import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Dashboard from './Dashboard';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch product data by ID
        axios.get(`http://localhost:5000/product/${id}`)
            .then(response => {
                const data = response.data;
                console.log('Fetched product data:', data); // Check data in console
                setProduct(data);

                // Set form default values from fetched data
                setValue('name', data.name);
                setValue('details', data.details);
                setValue('category', data.category);
                setValue('subcategory', data.subcategory);
                setValue('sellingPrice', data.price);
                setValue('deletePrice', data.deletePrice);
                setValue('sizes', data.sizes);
                setValue('colors', data.colors);
                setLoading(false);  // Turn off loading after data is fetched
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                setLoading(false);  // Turn off loading even in case of error
            });
    }, [id, setValue]);


    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        try {
            let imageUrl = product?.image;
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                const imageRes = await axios.post(image_hosting_api, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (imageRes.data.success) {
                    imageUrl = imageRes.data.data.display_url;
                } else {
                    throw new Error('Image upload failed');
                }
            }

            const productItem = {
                name: data.name,
                category: data.category,
                subcategory: data.subcategory,
                sellingPrice: parseFloat(data.sellingPrice),
                deletePrice: parseFloat(data.deletePrice),
                details: data.details,
                colors: data.colors,
                sizes: data.sizes,
                image: imageUrl
            };

            const productRes = await axios.patch(`http://localhost:5000/product/${id}`, productItem);

            if (productRes.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been updated successfully.`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/manage-product');
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "info",
                    title: `No changes were made to ${data.name}.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error occurred. Please try again.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if (loading) return <Loader />;

    return (
        <div>
            <Dashboard/>
            <div className='flex items-center -mt-20 md:-mt-28 justify-center md:mb-20 p-2'>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-lg mt-6 border-2 border-black">

                    {/* Product Name */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700">Product Name*</span>
                        </div>
                        <input {...register("name", { required: "Product Name is required" })} type="text" placeholder="Product Name" className="input input-bordered w-full" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </label>

                    {/* Category Selection */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text text-gray-700">Category*</span>
                            </div>
                            <select {...register("category", { required: "Category is required" })} className="select select-bordered w-full">
                                <option disabled value="default">Select category</option>
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

                        {/* Subcategory Selection */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text text-gray-700">Sub Category*</span>
                            </div>
                            <select {...register("subcategory", { required: "Subcategory is required" })} className="select select-bordered w-full">
                                <option disabled value="default">Select subcategory</option>
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

                    {/* Selling Price and Delete Price */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text text-gray-700">Selling Price*</span>
                            </div>
                            <input {...register("sellingPrice", { required: "Selling Price is required", valueAsNumber: true })} type="number" placeholder="Selling Price" className="input input-bordered w-full" />
                            {errors.sellingPrice && <p className="text-red-500 text-sm">{errors.sellingPrice.message}</p>}
                        </label>

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

                    {/* Color and Size */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text text-gray-700">Available Color*</span>
                            </div>
                            <input {...register("colors")} type="text" placeholder="Colors (comma separated)" className="input input-bordered w-full" />
                        </label>

                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text text-gray-700">Available Sizes*</span>
                            </div>
                            <input {...register("sizes")} type="text" placeholder="Sizes (comma separated)" className="input input-bordered w-full" />
                        </label>
                    </div>

                    {/* Image Upload */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700">Upload New Image</span>
                        </div>
                        <input type="file" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
                    </label>

                    <input type="submit" value="Update Product" className="btn btn-primary w-full" />
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
