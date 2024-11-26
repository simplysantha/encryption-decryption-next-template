"use client";

import { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [data, setData] = useState({ name: "", description: "" });

  // Synchronize `data` state with `initialData` prop when `initialData` changes
  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Edit Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Name"
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Description"
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
