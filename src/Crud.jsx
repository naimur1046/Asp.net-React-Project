import React, { useState, useEffect } from "react";
import axios from "axios";

const CrudApp = () => {
  const empdata = [
    { id: 1, name: "Monji", age: 29, isActive: true },
    { id: 2, name: "Virat", age: 30, isActive: true },
    { id: 3, name: "Rohit", age: 40, isActive: true },
  ];

  const getData = () => {
    axios
      .get("https://localhost:7123/api/Employee")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    isActive: true,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editingId ? { ...item, ...formValues } : item
        )
      );
      setEditingId(null);
    } else {
      const newId =
        data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      setData((prevData) => [
        ...prevData,
        { ...formValues, id: newId, age: Number(formValues.age) },
      ]);
    }

    setFormValues({ name: "", age: "", isActive: true });
    setModalOpen(false);
  };

  const handleEdit = (item) => {
    setFormValues(item);
    setEditingId(item.id);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this item?")) {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="m-10 p-5">
      {/* Form for Adding Data */}
      <form onSubmit={handleSubmit} className="mb-8 flex items-center gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formValues.name}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formValues.age}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <select
          name="isActive"
          value={formValues.isActive}
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              isActive: e.target.value === "true",
            }))
          }
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {editingId ? "Update" : "Submit"}
        </button>
      </form>

      {/* Table to Display Data */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Age</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">{item.age}</td>
                <td className="py-3 px-6">
                  {item.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="py-3 px-6">
                  <button
                    className="text-white bg-yellow-500 px-3 py-1 mr-2 rounded"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-white bg-red-500 px-3 py-1 rounded"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Employee" : "Add Employee"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={handleInputChange}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formValues.age}
                onChange={handleInputChange}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <select
                name="isActive"
                value={formValues.isActive}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    isActive: e.target.value === "true",
                  }))
                }
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudApp;
