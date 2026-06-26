import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-600 to-rose-400 text-white py-20 px-6 sm:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            About <span className="text-amber-300">YourStore</span>
          </h1>
          <p className="text-lg sm:text-xl text-rose-100 max-w-2xl mx-auto">
            Your destination for high-quality, ethically made products that bring style and sustainability together.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto py-16 px-6 sm:px-10">
        <div className="bg-white shadow-md rounded-2xl p-8 md:p-14">
          <h2 className="text-3xl font-bold text-rose-600 mb-4">Our Story</h2>
          <p className="text-lg leading-relaxed mb-4">
            Founded in 2023,{" "}
            <span className="font-semibold text-rose-500">YourStoreName</span>{" "}
            began as a small passion project focused on delivering high-quality, ethically made goods.
            What started in a garage has now grown into a global eCommerce brand with thousands of happy customers worldwide.
          </p>
          <p className="text-lg leading-relaxed">
            Our mission is simple: to make everyday essentials beautiful, sustainable, and accessible.
            We believe that doing good can go hand-in-hand with doing business.
          </p>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-gray-100 py-16 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-rose-600 mb-12">
            What Makes Us Different
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Sustainable Sourcing",
                text: "All our products are made with ethically sourced materials and minimal environmental impact.",
              },
              {
                title: "Premium Quality",
                text: "Every item is hand-checked and backed by a satisfaction guarantee — quality is our promise.",
              },
              {
                title: "Customer-Centered",
                text: "We offer 24/7 support, easy returns, and a smooth buying experience from start to finish.",
              },
              {
                title: "Community Impact",
                text: "Every purchase supports reforestation projects and local artisans around the world.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-rose-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center">
        <h3 className="text-2xl font-semibold mb-4">
          Ready to explore our collection?
        </h3>
        <Link
          to="/products"
          className="inline-block px-8 py-3 bg-rose-600 text-white text-lg font-semibold rounded-full hover:bg-rose-700 transition"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
