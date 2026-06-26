import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import banner1 from "../assets/Bann/banner1.jpg";
import banner5 from "../assets/Bann/banner5.jpg";
import banner2 from "../assets/Bann/banner2.jpg";
import banner3 from "../assets/Bann/banner3.jpg";

const BannerSection = () => {
  const images = [banner1, banner2, banner3, banner5];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 relative bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
                Discover the Latest Trends
              </h1>
              <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-200 mb-3 sm:mb-5 max-w-2xl">
                Shop the best deals on top fashion & gadgets now!
              </p>

              <button className="px-4 sm:px-6 py-2 bg-orange-600 hover:bg-orange-700 rounded-md text-xs sm:text-sm md:text-base font-medium transition duration-300">
                <Link to={"/products"}>
                  Shop Now
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:px-3 sm:py-2 rounded-full text-xs sm:text-base"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:px-3 sm:py-2 rounded-full text-xs sm:text-base"
      >
        ❯
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition ${currentIndex === index
              ? "bg-orange-600"
              : "bg-white/70 hover:bg-orange-400"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerSection;
