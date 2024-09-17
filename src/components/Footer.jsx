import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa'; 
import visa from '../assets/visapng.png'; 
import mastercard from '../assets/mastercard.png';
import paypal from '../assets/paypal.png';
import applepay from '../assets/pay.png';
import googlepay from '../assets/googlepay.png';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-10">
            <div className="mx-auto container px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                    {/* Shop.co Section */}
                    <div className="col-span-1">
                        <h1 className="text-2xl font-bold">SHOP.P</h1>
                        <p className="text-gray-600 mt-2">We have clothes that suit your style and which you're proud to wear. From women to men.</p>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4 mt-4">
                            <FaTwitter className="text-xl text-gray-600 hover:text-gray-800" />
                            <FaFacebookF className="text-xl text-gray-600 hover:text-gray-800" />
                            <FaInstagram className="text-xl text-gray-600 hover:text-gray-800" />
                            <FaGithub className="text-xl text-gray-600 hover:text-gray-800" />
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="col-span-1">
                        <h2 className="text-lg font-semibold">COMPANY</h2>
                        <ul className="mt-2 space-y-2 text-gray-600">
                            <li><a href="#" className="hover:underline">About</a></li>
                            <li><a href="#" className="hover:underline">Features</a></li>
                            <li><a href="#" className="hover:underline">Works</a></li>
                            <li><a href="#" className="hover:underline">Career</a></li>
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div className="col-span-1">
                        <h2 className="text-lg font-semibold">HELP</h2>
                        <ul className="mt-2 space-y-2 text-gray-600">
                            <li><a href="#" className="hover:underline">Customer Support</a></li>
                            <li><a href="#" className="hover:underline">Delivery Details</a></li>
                            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* FAQ Links */}
                    <div className="col-span-1">
                        <h2 className="text-lg font-semibold">FAQ</h2>
                        <ul className="mt-2 space-y-2 text-gray-600">
                            <li><a href="#" className="hover:underline">Account</a></li>
                            <li><a href="#" className="hover:underline">Manage Deliveries</a></li>
                            <li><a href="#" className="hover:underline">Orders</a></li>
                            <li><a href="#" className="hover:underline">Payments</a></li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div className="col-span-1">
                        <h2 className="text-lg font-semibold">RESOURCES</h2>
                        <ul className="mt-2 space-y-2 text-gray-600">
                            <li><a href="#" className="hover:underline">Free eBooks</a></li>
                            <li><a href="#" className="hover:underline">Development Tutorial</a></li>
                            <li><a href="#" className="hover:underline">How to - Blog</a></li>
                            <li><a href="#" className="hover:underline">YouTube Playlist</a></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-300 my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Copyright Text */}
                    <p className="text-gray-600">SHOP.P © 2000-2023, All Rights Reserved</p>

                    {/* Payment Methods */}
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <img src={visa} alt="Visa" className="h-8 w-auto" />
                        <img src={mastercard} alt="Mastercard" className="h-8 w-auto" />
                        <img src={paypal} alt="Paypal" className="h-8 w-auto" />
                        <img src={applepay} alt="Apple Pay" className="h-8 w-auto" />
                        <img src={googlepay} alt="Google Pay" className="h-8 w-auto" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
