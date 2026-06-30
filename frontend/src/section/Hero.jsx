import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from "../assets/Hero/Hero 1.jpg";

const Hero = () => {
  return (
    <section className="flex flex-wrap items-center justify-between gap-8 px-6 py-12 bg-white md:px-12">
      <div className="flex-1 min-w-[300px] px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Shop the Latest Trends
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover the best deals on fashion, electronics, and more. Fast shipping & easy returns.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-md text-base font-medium transition-colors duration-300 hover:bg-yellow-400 hover:text-black">
          <Link to={"/products"}>
            Shop Now
          </Link>
        </button>
      </div>

      <div className="flex-1 min-w-[300px] px-4 text-center">
        <img
  src={heroImage}
  alt="Featured Product"
  className="w-full max-w-md mx-auto rounded-xl shadow-md"
/>
      </div>
    </section>
  );
};

export default Hero;
