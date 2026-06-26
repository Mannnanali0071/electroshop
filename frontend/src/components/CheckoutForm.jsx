import React, { useState } from "react";

const CheckoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    shippingAddress1: "",
    shippingAddress2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((val) => !val.trim())) {
      alert("Please fill all fields");
      return;
    }
    onSubmit(formData);
    alert("Shipping details saved!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 mt-6 space-y-4"
    >
      <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
      {[
        { label: "Address Line 1", name: "shippingAddress1" },
        { label: "Address Line 2", name: "shippingAddress2" },
        { label: "City", name: "city" },
        { label: "State", name: "state" },
        { label: "ZIP / Postal Code", name: "zip" },
        { label: "Country", name: "country" },
        { label: "Phone", name: "phone" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <input
            type="text"
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Save Shipping Details
      </button>
    </form>
  );
};

export default CheckoutForm;
