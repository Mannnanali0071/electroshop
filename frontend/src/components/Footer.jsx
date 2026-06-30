import React from 'react';
import { Link } from 'react-router-dom';

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-12 pb-6 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Logo/About */}
        <div>
          <h2 className="text-rose-400 text-xl font-bold mb-4">YourStore</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            YourStore is your go-to online destination for the latest trends in fashion, tech, and lifestyle.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-rose-300 text-lg font-semibold mb-4">Quick Links</h4>
         <ul className="space-y-2 text-sm">
  <li><Link to="/" className="hover:text-rose-400 transition">Home</Link></li>
  <li><Link to="/about" className="hover:text-rose-400 transition">About</Link></li>
  <li><Link to="/contact" className="hover:text-rose-400 transition">Contact</Link></li>
</ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-rose-300 text-lg font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/Contact" className="hover:text-rose-400 transition">Help Center</a></li>
            <li><a href="/shipping" className="hover:text-rose-400 transition">Shipping & Delivery</a></li>
            <li><a href="/returns" className="hover:text-rose-400 transition">Returns & Exchanges</a></li>
            <li><a href="/faq" className="hover:text-rose-400 transition">FAQs</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-rose-300 text-lg font-semibold mb-4">Stay Connected</h4>
          <form className="mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <button
              type="submit"
              className="mt-3 w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded text-sm font-medium transition"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-rose-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-rose-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-rose-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-rose-400 transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} YourStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
