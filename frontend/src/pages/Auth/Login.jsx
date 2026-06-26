import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { successMSG, errorMSG } from "../../utils/msg";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const url = "http://localhost:5001/api/auth/login";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      const { token, message, success, user } = result;

      if (success) {
        successMSG(message);
        localStorage.setItem("token", token);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("admin", user.isAdmin);
        localStorage.setItem("phone", user.phone);
        localStorage.setItem("userId", user.id)

        setTimeout(() => {
          if (user.isAdmin) {
            navigate("/admin/profile")
          }
          else {
            navigate('/user/profile')
          }
        }, 3000);
      } else {
        errorMSG(message || "Login failed ❌");
      }
    } catch (error) {
      console.error(error);
      errorMSG("Something went wrong, please try again later ❌");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-rose-50 to-purple-50 px-4">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden my-12">
          {/* Left Side */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-rose-500 to-purple-600 flex-col p-10 text-white">
            <div className="flex items-center gap-3 mb-10">
              <FaShopify className="text-4xl text-white" />
              <h1 className="text-2xl font-bold tracking-wide">YourStore</h1>
            </div>
            <div className="flex-1 flex flex-col justify-center text-center space-y-4">
              <h2 className="text-3xl font-bold">Welcome Back ✨</h2>
              <p className="text-lg opacity-90">
                Log in to your account and continue your journey with us 🚀
              </p>
            </div>
            <div className="text-sm opacity-70 text-center mt-10">
              © {new Date().getFullYear()} YourStore. All rights reserved.
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                Login to Your Account
              </h3>
              <p className="text-gray-500 mt-2">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white p-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition duration-300"
              >
                Login
              </button>

              <p className="text-center text-gray-500 mt-4">
                Don't have an account?{" "}
                <Link
                  to="/auth/register-step-1"
                  className="text-rose-600 font-semibold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Login;
