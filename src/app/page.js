"use client";

import { useState, useEffect } from "react";
import { fetchAllItems, createItem, updateItem, deleteItem } from "@/lib/api";
import Form from "@/components/Form";
import List from "@/components/List";
import Modal from "@/components/Modal";

export default function Home() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // For editing modal

  // Load all items
  const loadItems = async () => {
    try {
      const response = await fetchAllItems();
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Handle item creation
  const handleCreate = async (newItem) => {
    try {
      await createItem(newItem);
      loadItems();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  // Handle item update
  const handleUpdate = async (updatedItem) => {
    try {
      await updateItem(editingItem._id, updatedItem);
      setEditingItem(null); // Clear editing state
      setIsModalOpen(false); // Close the modal
      loadItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Handle item deletion
  const handleDelete = async (_id) => {
    console.log(_id);

    try {
      await deleteItem(_id);
      loadItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Open modal for editing
  const handleEdit = (item) => {
    setEditingItem(item); // Set the item to be edited
    setIsModalOpen(true); // Open the modal
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">CRUD Application</h1>

      {/* Form for creating new items */}
      <Form
        onSubmit={handleCreate}
        initialData={{ name: "", description: "" }}
      />

      {/* List of items */}
      <List items={items} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Modal for editing items */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        onSubmit={handleUpdate} // Handle the update
        initialData={editingItem} // Pass the item to edit
      />
    </div>
  );
}
