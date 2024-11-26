"use client";

const List = ({ items, onEdit, onDelete }) => (
  <ul className="space-y-4">
    {items.map((item) => (
      <li key={item._id} className="flex justify-between p-4 border rounded">
        <div>
          <h3 className="font-bold">{item.name}</h3>
          <p>{item.description}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default List;
