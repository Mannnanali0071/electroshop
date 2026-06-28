import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaShopify } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { errorMSG, successMSG } from "../../utils/msg";

const RegisterStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get userdata from step 1
  const userdata = location.state || {};

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit handler
  const onSubmit = async (address) => {
    try {
      const finalData = { ...userdata, address };

      const res = await fetch("http://electroshop-334x.onrender.com/api/auth/register", {
        method: "POST",
        body: JSON.stringify(finalData),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      console.log("API Response:", data);

      const { message, success, error } = data;

      // Priority 1: If API sends error array
      if (error && error.length > 0) {
        return errorMSG(error?.[0]?.message || "Something went wrong ❌");
      }

      // Priority 2: If API sends { success: false, message: "..." }
      if (success === false) {
        return errorMSG(message || "Registration failed ❌");
      }

      // Priority 3: Success
      if (success) {
        successMSG(message || "Registration successful ✅");
        setTimeout(() => {
          navigate("/auth/login"); // redirect
        }, 1500);
      }
    } catch (err) {
      console.error("Register error:", err);
      errorMSG("Something went wrong, please try again later ❌");
    }
  };

  return (
    <>
      {/* Gradient background */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-rose-50 to-purple-50 px-4">
        {/* White card */}
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden my-12">
          {/* Left Side */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-rose-500 to-purple-600 flex-col p-10 text-white relative">
            <div className="flex items-center gap-3 mb-10">
              <FaShopify className="text-4xl text-white" />
              <h1 className="text-2xl font-bold tracking-wide">yourStore</h1>
            </div>
            <div className="flex-1 flex flex-col justify-center text-center space-y-4">
              <h2 className="text-3xl font-bold">Almost Done 🎉</h2>
              <p className="text-lg opacity-90 leading-relaxed">
                Just enter your address details to complete your profile.
              </p>
            </div>
            <div className="text-sm opacity-70 text-center mt-10">
              © {new Date().getFullYear()} YourStore. All rights reserved.
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10">
            {/* Progress */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center opacity-50">
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-500 font-bold">
                  1
                </div>
                <span className="ml-2 font-medium text-gray-500">
                  Account Info
                </span>
              </div>
              <div className="flex-1 h-[2px] bg-gray-300 mx-2"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-500 text-white font-bold">
                  2
                </div>
                <span className="ml-2 font-semibold text-rose-600">
                  Address Setup
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                Step 2: Address Information
              </h3>
              <p className="text-gray-500 mt-2">
                Provide your address to complete your registration.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Street */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street / Area
                </label>
                <input
                  {...register("street", { required: "Street is required" })}
                  type="text"
                  placeholder="123 Main Street"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
                {errors.street && (
                  <p className="text-red-500 text-sm">
                    {errors.street.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  {...register("city", { required: "City is required" })}
                  type="text"
                  placeholder="Ahmedabad"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  {...register("state", { required: "State is required" })}
                  type="text"
                  placeholder="Gujarat"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  {...register("country", { required: "Country is required" })}
                  type="text"
                  placeholder="India"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  {...register("pincode", {
                    required: "Pincode is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Pincode must be 6 digits",
                    },
                  })}
                  type="text"
                  placeholder="380001"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm">
                    {errors.pincode.message}
                  </p>
                )}
              </div>

              {/* Register Button */}
              <div className="flex">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white p-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition duration-300"
                >
                  Register <FaArrowRight />
                </button>
              </div>

              {/* Already have account */}
              <p className="text-center text-gray-500 mt-4">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-rose-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

export default RegisterStep2;
