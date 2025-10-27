"use client";

import Image from "next/image";

export default function AdditionalBenefits() {
  return (
    <div className=" py-12">
      <div
        className="
          max-w-7xl mx-auto 
          grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 
          gap-10 text-center px-6
        "
      >
        

        {/* 🌸 Premium fragrances */}
        <div className="flex flex-col items-center">
          <Image
            src="/images/parfum.png"
            alt="Premium fragrances"
            width={55}
            height={45}
            className="object-contain mb-2 drop-shadow-md"
          />
          <h3 className="font-semibold text-lg text-gray-800">
            Premium fragrances
          </h3>
        </div>

        {/* 💳 Secure payment */}
        <div className="flex flex-col items-center">
          <Image
            src="/images/credit-card.png"
            alt="Secure payment"
            width={55}
            height={45}
            className="object-contain mb-2 drop-shadow-md"
          />
          <h3 className="font-semibold text-lg text-gray-800">
            Secure payment
          </h3>
        </div>
       

        {/* 📞 24/7 Support */}
        <div className="flex flex-col items-center">
          <Image
            src="/images/costumer-service.png"
            alt="24/7 Support"
            width={55}
            height={45}
            className="object-contain mb-2 drop-shadow-md"
          />
          <h3 className="font-semibold text-lg text-gray-800">24/7 Support</h3>
        </div>

        {/* 🔁 Easy Returns & Exchanges */}
        <div className="flex flex-col items-center">
          <Image
            src="/images/backward.png"
            alt="Easy Returns & Exchanges"
            width={55}
            height={45}
            className="object-contain mb-2 drop-shadow-md"
          />
          <h3 className="font-semibold text-lg text-gray-800">
            Easy Returns & Exchanges
          </h3>
        </div>
         {/* 🗺️ Delivery across Morocco */}
        <div className="flex flex-col items-center">
          <Image
            src="/images/morocco (2).png"
            alt="Delivery across Morocco"
            width={55}
            height={45}
            className="object-contain mb-2 drop-shadow-md"
          />
          <h3 className="font-semibold text-lg text-gray-800">
            Delivery across Morocco
          </h3>
        </div>

        {/* 🎁 Complimentary gift wrapping */}
        <div className="flex flex-col items-center">
          <Image
            src="/images/gift-box-with-a-bow.png"
            alt="Complimentary gift wrapping"
            width={55}
            height={45}
            className="object-contain mb-2 drop-shadow-md"
          />
          <h3 className="font-semibold text-lg text-gray-800">
            Complimentary gift wrapping
          </h3>
        </div>
      </div>
    </div>
  );
}
