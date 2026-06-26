import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowRight, FaShopify } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👀 icons
import { useForm } from "react-hook-form";

const RegisterStep1 = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // If valid, go to step 2
    navigate("/auth/register-step-2", { state: data });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-rose-50 to-purple-50 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden my-12">
        {/* Left Side */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-rose-500 to-purple-600 flex-col p-10 text-white relative">
          <div className="flex items-center gap-3 mb-10">
            <FaShopify className="text-4xl text-white" />
            <h1 className="text-2xl font-bold tracking-wide">YourStore</h1>
          </div>
          <div className="flex-1 flex flex-col justify-center text-center space-y-4">
            <h2 className="text-3xl font-bold">Welcome ✨</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Start your journey with us. Create your account in just a minute 🚀
            </p>
          </div>
          <div className="text-sm opacity-70 text-center mt-10">
            © {new Date().getFullYear()} YourStore. All rights reserved.
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10">
          {/* Stepper */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-500 text-white font-bold">
                1
              </div>
              <span className="ml-2 font-semibold text-rose-600">
                Account Info
              </span>
            </div>
            <div className="flex-1 h-[2px] bg-gray-300 mx-2"></div>
            <div className="flex items-center opacity-50">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-500 font-bold">
                2
              </div>
              <span className="ml-2 font-medium text-gray-500">
                Profile Setup
              </span>
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Step 1: Account Information
            </h3>
            <p className="text-gray-500 mt-2">
              Fill in your basic details to create your account.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register("name", {
                  required: "Full Name is required",
                  minLength: {
                    value: 4,
                    message: "Name must be at least 4 characters",
                  },
                })}
                type="text"
                placeholder="John Doe"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password with Toggle 👁 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"} // 👈 toggle input type
                  placeholder="••••••••"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                type="text"
                placeholder="9876543210"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Admin Checkbox */}
            <div className="flex items-center gap-2">
              <input
                id="isAdmin"
                type="checkbox"
                {...register("isAdmin")}
                className="h-4 w-4 text-rose-500 focus:ring-rose-400 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="isAdmin"
                className="text-gray-700 font-medium cursor-pointer"
              >
                Register as Admin
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white p-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition duration-300"
            >
              Next <FaArrowRight />
            </button>

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
  );
};

export default RegisterStep1;
