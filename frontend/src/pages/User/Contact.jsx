import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-16 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">Get in Touch</h1>
        <p className="text-gray-600 text-center mb-10">
          Need assistance? Contact our team — we’re here to help you with orders, products, and support.
        </p>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div className="bg-blue-100 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">Customer Support</h2>
            <p className="text-gray-700">
              📧 Email: <a href="mailto:support@yoursite.com" className="text-blue-700 underline">support@yourstore.com</a>
            </p>
            <p className="text-gray-700">
              📞 Phone: <a href="tel:+ 9421237869" className="text-blue-700 underline"> +9421237869</a>
            </p>
            <p className="text-gray-700 mt-2">🕒 Hours: Mon - Fri, 9am - 5pm</p>
          </div>

          <div className="bg-blue-100 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">Visit Us</h2>
            <p className="text-gray-700">🏬 YourStore Inc.</p>
            <p className="text-gray-700">Ambar-Tower , near Moti-bakery</p>
            <p className="text-gray-700">Ahemdabad , 380001 </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
              required
            />
          </div>
          <textarea
            placeholder="Your Message"
            className="border border-gray-300 rounded-lg p-4 h-36 resize-none focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
            required
          />
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition"
          >
            📩 Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
