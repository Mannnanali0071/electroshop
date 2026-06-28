import React, { useEffect, useState } from "react";
import { errorMSG, successMSG } from "../../utils/msg";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://electroshop-334x.onrender.com/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
      errorMSG("Something went wrong! Please try again");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://electroshop-334x.onrender.com/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) throw new Error("Failed to create category");
      const data = await response.json();
      setCategories((prev) => [...prev, data]);
      successMSG("Category created successfully");
    } catch (error) {
      console.error(error);
      errorMSG("Failed to create category");
    } finally {
      setShowModal(false);
      setNewCategory({ name: "" });
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://electroshop-334x.onrender.com/api/categories/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to delete category");

      const data = await response.json();
      successMSG(`${data.name} Category Deleted Successfully`);
      setCategories((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      errorMSG("Failed to delete category");
    }
  };

  // EDIT Modal
  const openEditModal = (cat) => {
    setSelectedCategory(cat);
    setNewCategory({ name: cat.name });
    setShowModal(true);
  };

  // SUBMIT EDIT
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://electroshop-334x.onrender.com/api/categories/${selectedCategory._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCategory),
        }
      );
      if (!response.ok) throw new Error("Failed to edit category");

      const data = await response.json();
      setCategories((prev) =>
        prev.map((item) => (item._id === data._id ? data : item))
      );
      successMSG("Category updated successfully");
    } catch (error) {
      console.error(error);
      errorMSG("Something went wrong! Please try again");
    } finally {
      setShowModal(false);
      setSelectedCategory(null);
      setNewCategory({ name: "" });
    }
  };

  // Filtered list
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-gray-400">Loading categories...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-orange-400">Categories</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <FaPlus /> Create
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 w-72 shadow-sm">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-gray-200 w-full"
        />
      </div>

      {/* Categories Table */}
      {filteredCategories.length === 0 ? (
        <p className="text-gray-400">No categories found</p>
      ) : (
        <div className="bg-[#1a1a1a] rounded-xl shadow-xl overflow-hidden border border-gray-700">
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-sm border-collapse">
              <thead className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm">
                <tr>
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((cat, index) => (
                  <tr key={cat._id} className="border-b border-gray-700 last:border-0">
                    <td className="p-4 text-gray-400">{index + 1}</td>
                    <td className="p-4 text-gray-200 font-medium">{cat.name}</td>
                    <td className="p-4 text-gray-400">
                      {cat.description || (
                        <span className="italic text-gray-500">No description</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => openEditModal(cat)}
                          title="Edit"
                          className="p-2 rounded-md bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          title="Delete"
                          className="p-2 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-[#1f1f1f] rounded-xl w-[400px] shadow-2xl border border-gray-700 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-orange-400">
                {selectedCategory ? "Edit Category" : "Create Category"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedCategory(null);
                  setNewCategory({ name: "" });
                }}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={selectedCategory ? handleEditSubmit : handleCreate}
              className="p-6 space-y-4"
            >
              <input
                type="text"
                placeholder="Category Name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="w-full p-3 rounded-lg border border-gray-700 bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedCategory(null);
                    setNewCategory({ name: "" });
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow transition"
                >
                  {selectedCategory ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Categories;
