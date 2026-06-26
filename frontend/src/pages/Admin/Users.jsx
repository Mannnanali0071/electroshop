import React, { useEffect, useState } from "react";
import { errorMSG } from "../../utils/msg";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsersdata = async () => {
    const uri = "http://localhost:5001/api/auth/users";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(uri, {
        method: "GET",
        headers: {
          Authorization: token, // 🔑 Pass token
        },
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      errorMSG(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersdata();
  }, []);

  return (
    <div className="p-6">
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-orange-400">Users</h1>
        <span className="text-gray-400 text-sm">
          Total: <span className="text-orange-300 font-semibold">{users.length}</span>
        </span>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-10 text-gray-400">
          <svg
            className="animate-spin h-7 w-7 mr-3 text-orange-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          Fetching users...
        </div>
      ) : users && users.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-800 bg-[#1a1a1a] shadow-lg">
            <table className="w-full text-sm text-gray-400">
              <thead className="bg-[#222222] text-gray-300 text-left">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4">Updated</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-t border-gray-800 hover:bg-[#2a2a2a] transition"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-200">
                      <Link
                        to={user._id}
                        className="hover:text-orange-400 transition"
                      >
                        {user.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${user.isAdmin
                            ? "bg-blue-900 text-blue-300"
                            : "bg-gray-800 text-gray-400"
                          }`}
                      >
                        {user.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-green-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-yellow-400">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid gap-4 md:hidden">
            {users.map((user, index) => (
              <Link key={user._id} to={user._id}>
                <div className="rounded-xl border border-gray-800 bg-[#1a1a1a] p-4 shadow-md hover:border-orange-500 transition">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-200">
                      {user.name}
                    </h2>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${user.isAdmin
                          ? "bg-blue-900 text-blue-300"
                          : "bg-gray-800 text-gray-400"
                        }`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Created:{" "}
                    <span className="text-green-400">
                      {new Date(user.createdAt).toLocaleString()}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Updated:{" "}
                    <span className="text-yellow-400">
                      {new Date(user.updatedAt).toLocaleString()}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">🚫 No users found</p>
      )}
    </div>
  );
};

export default Users;
