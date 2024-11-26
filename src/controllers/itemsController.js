import Item from "@/models/Item";

export const getAllItems = async () => {
  try {
    const items = await Item.find({});
    return items; // Return plain data
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Error fetching items");
  }
};

export const getItemById = async (_, request) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      throw new Error("ID is required");
    }

    const item = await Item.findById(id);
    if (!item) {
      throw new Error("Item not found");
    }

    return item; // Return the plain item data
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    throw error; // Let secureController handle the error response
  }
};

export const createItem = async (decryptedBody) => {
  try {
    const newItem = new Item(decryptedBody); // Use decrypted data
    const savedItem = await newItem.save();
    return savedItem; // Return plain response
  } catch (error) {
    console.error("Error creating item:", error);
    throw new Error("Error creating item");
  }
};

export const updateItem = async (decryptedBody, request) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      throw new Error("ID is required");
    }

    const updatedItem = await Item.findByIdAndUpdate(id, decryptedBody, {
      new: true
    });

    if (!updatedItem) {
      throw new Error("Item not found");
    }

    return updatedItem; // Return plain response
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = async (_, request) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      throw new Error("ID is required");
    }

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      throw new Error("Item not found");
    }

    return deletedItem; // Return plain response
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
