
import React from 'react';
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";

const HeaderTop = () => {
    const phoneNumber = "+212 600 123 456"; // Ton numéro
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="container mx-auto py-3 px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center">

                    {/* Icônes réseaux sociaux */}
                    <div className='hidden lg:flex gap-3 items-center'>
                        <a href="#" className="header_top_icon_wrapper hover:text-[#e3ac28]"><BsFacebook /></a>
                        <a href="#" className="header_top_icon_wrapper hover:text-[#e3ac28]"><BsTwitter /></a>
                        <a href="#" className="header_top_icon_wrapper hover:text-[#e3ac28]"><BsInstagram /></a>
                        <a href="#" className="header_top_icon_wrapper hover:text-[#e3ac28]"><BsLinkedin /></a>
                    </div>

                    {/* Message central */}
                    <div className="text-black text-[16px] text-center sm:text-left my-2 sm:my-0 font-semibold">
                        FREE SHIPPING THIS WEEK OVER $55
                    </div>

                    {/* Bloc contact */}
                    <div className="flex gap-8 items-center text-black text-[14px] ">
                        {/* Numéro téléphone */}
                        <a href={`tel:${phoneNumber}`} className="flex items-center gap-1 hover:text-[#e3ac28] cursor-pointer">
                            <FiPhone className="text-lg" /> {phoneNumber}
                        </a>

                        {/* WhatsApp */}
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#e3ac28] cursor-pointer">
                            <BsWhatsapp className="text-lg" /> WhatsApp
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HeaderTop;
