import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiVisa, SiPaypal, SiMastercard } from "react-icons/si";

const Footer = () => {
    return (
        <footer className="bg-[#e3ab28] text-white relative">
            <div className="container mx-auto py-12 md:py-16 px-4 sm:px-6 md:px-16 flex flex-col items-center text-center md:flex-row md:justify-between md:items-start gap-8">

                {/* Colonne Adresse */}
                <div className="flex flex-col gap-3 items-center md:items-start">
                    <h3 className="font-semibold text-lg">Address :</h3>
                    <p>1 Bd de l'Océan</p>
                    <p>City : Casablanca 20180</p>
                    <p>Country : Morocco</p>
                    {/* Icônes paiement */}
                    <div className="flex gap-4 mt-2 justify-center items-center">
                        <SiVisa className="w-10 h-10 text-white p-2 bg-[#e3ab28] rounded-lg hover:scale-110 transition-transform duration-300 shadow-md" />
                        <SiPaypal className="w-10 h-10 text-white p-2 bg-[#e3ab28] rounded-lg hover:scale-110 transition-transform duration-300 shadow-md" />
                        <SiMastercard className="w-10 h-10 text-white p-2 bg-[#e3ab28] rounded-lg hover:scale-110 transition-transform duration-300 shadow-md" />
                    </div>
                </div>

                {/* Colonne Logo + message */}
                <div className="flex flex-col items-center text-center gap-4">
                    <h2 className="text-5xl md:text-6xl font-serif italic font-bold tracking-wide text-white">Luxury</h2>

                    <p className="text-sm md:text-base max-w-xs text-white">
                        With a commitment to excellence, we thrive in delivering exceptional solutions
                        and building lasting partnerships. Our journey is defined by a relentless pursuit of growth.
                    </p>

                    <div className="flex gap-4 mt-2">
                        <a
                            href="#"
                            className="p-2 rounded-full bg-transparent text-white hover:bg-white hover:text-[#e3ab28] hover:scale-110 transition-all duration-300 shadow-lg"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-full bg-transparent text-white hover:bg-white hover:text-[#e3ab28] hover:scale-110 transition-all duration-300 shadow-lg"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-full bg-transparent text-white hover:bg-white hover:text-[#e3ab28] hover:scale-110 transition-all duration-300 shadow-lg"
                        >
                            <FaYoutube />
                        </a>
                    </div>

                </div>

                {/* Colonne Info */}
                <div className="flex flex-col gap-2 items-center md:items-end">
                    <h3 className="font-semibold text-lg">Info :</h3>
                    <p>Support : luxuryperfume@gmail.com</p>
                    <p>Email : luxuryperfume@gmail.com</p>
                    <p>Phone : +212 600 123 456</p>
                </div>

            </div>

            {/* Bas de page */}
            <div className=" text-center py-5 md:py-5 text-[16px] md:text-[18px] text-[#e3ab28] bg-white">
                <div className="flex justify-center gap-6 flex-wrap font-semibold tracking-wide">
                    <a href="/" className="navbar_link relative">Home</a>
                    <span>•</span>
                    <a href="/about" className="navbar_link relative">About</a>
                    <span>•</span>
                    <a href="/shop/women" className="navbar_link relative">Shop</a>
                    <span>•</span>
                    <a href="/contact" className="navbar_link relative">Contact</a>
                </div>
            </div>
        </footer>

    );
}

export default Footer;
