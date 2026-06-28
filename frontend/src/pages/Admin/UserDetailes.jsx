import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetailes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://electroshop-334x.onrender.com/api/auth/user/${id}`, {
          headers: { Authorization: token },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (!user) return <p className="text-red-400">User not found</p>;

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm shadow-md"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-orange-400 mb-6">User Details</h1>

      <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-6 text-gray-200 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-gray-400">{user.phone}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${user.isAdmin
                ? "bg-blue-900 text-blue-300"
                : "bg-gray-800 text-gray-400"
              }`}
          >
            {user.isAdmin ? "Admin" : "User"}
          </span>
        </div>

        {/* Address */}
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-2">Address</h3>
          {user.address ? (
            <p className="text-gray-300">
              {user.address.street || ""}, {user.address.city || ""},{" "}
              {user.address.state || ""}, {user.address.country || ""} -{" "}
              {user.address.pincode || ""}
            </p>
          ) : (
            <p className="text-gray-500">N/A</p>
          )}
        </div>

        {/* Meta info */}
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-2">Meta Info</h3>
          <p>
            <span className="font-medium">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">User ID: </span>
            {user._id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailes;
