import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle, FaCrown, FaUser } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  // Get values from localStorage
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const admin = localStorage.getItem("admin");
  const phone = localStorage.getItem("phone");

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  // Role-based theme
  const isAdmin = admin === "true";
  const roleGradient = isAdmin
    ? "from-rose-600 via-rose-500 to-rose-700" // Admin
    : "from-teal-500 via-cyan-500 to-blue-600"; // User

  const cardBorder = isAdmin ? "border-rose-500/40" : "border-blue-500/40";
  const roleIcon = isAdmin ? <FaCrown className="text-yellow-300 text-3xl" /> : <FaUser className="text-blue-300 text-3xl" />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div
        className={`w-full max-w-md bg-gray-900/90 backdrop-blur-md shadow-xl rounded-2xl p-6 border ${cardBorder}`}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-gray-300 hover:text-white flex items-center gap-2 transition"
        >
          ← Back
        </button>

        {name || email ? (
          <>
            {/* Logged-in User Profile */}
            <div className="flex flex-col items-center mb-6">
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-tr ${roleGradient} flex items-center justify-center text-white text-3xl font-bold shadow-lg`}
              >
                {name ? name.charAt(0).toUpperCase() : "U"}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white flex items-center gap-2">
                {name} {roleIcon}
              </h3>
              <p className="text-gray-400">{email}</p>
              {phone && <p className="text-gray-400">{phone}</p>}
              <p className="text-gray-400">
                Role:{" "}
                <span
                  className={`font-medium ${isAdmin ? "text-rose-400" : "text-blue-400"
                    }`}
                >
                  {isAdmin ? "Admin" : "User"}
                </span>
              </p>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className={`w-full ${isAdmin
                  ? "bg-rose-600 hover:bg-rose-700"
                  : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 px-4 rounded-lg transition`}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Guest Profile Card */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-5xl">
                <FaUserCircle />
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">Guest</h3>
              <p className="text-gray-400">Not logged in</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link
                to="/auth/login"
                className="flex-1 bg-rose-600 text-center text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="flex-1 bg-gray-700 text-center text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
