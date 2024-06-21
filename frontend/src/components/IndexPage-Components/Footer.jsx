import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <section title="footer" className="w-full bg-[#d9b48f]">
            <footer className="py-12">
                <div className="w-full mx-auto xl:px-20 md:px-10 px-4">
                    <div className="w-full sm:flex flex-wrap justify-between gap-y-8">
                        <div className="flex px-2 mb-4">
                            <div className="text-left">
                                <img className="h-8 w-auto" src="/IndexPage-assests/logo.png" alt="Logo" />
                                <p className="pt-2 text-sm font-md text-black">A centralized management for everyone.</p>
                            </div>
                        </div>

                        <div className="flex flex-col px-2 mb-4">
                            <div className="text-left">
                                <h2 className="pt-2 text-sm font-md text-black capitalize">Follow Us</h2>
                                <div className="mt-4 flex space-x-4">
                                    <FaLinkedin className='h-6 w-6 text-black' />
                                    <FaFacebook className='h-6 w-6 text-black' />
                                    <FaInstagram className='h-6 w-6 text-black' />
                                    <FaXTwitter className='h-6 w-6 text-black' />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col px-2">
                            <div className="text-left">
                                <h2 className="pt-2 text-sm font-md text-black capitalize">Contact Us</h2>
                                <div className="mt-2 flex space-x-4">
                                    <MdOutlineEmail className='h-6 w-6 text-neblack' />
                                    <FaWhatsapp className='h-6 w-6 text-neblack' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-1 mt-4 border-black" />

                    <div className="mt-4 flex flex-wrap justify-start gap-y-4 gap-x-12 px-2">
                        <p className="text-sm font-md text-black capitalize">
                            Developed By Aditya Madhab (Sane Infotech)
                        </p>
                        <p className="text-sm font-md text-black capitalize">Privacy Policy</p>
                        <p className="text-sm font-md text-black capitalize">Terms and conditions</p>
                    </div>
                </div>
            </footer>
        </section>
    );
};