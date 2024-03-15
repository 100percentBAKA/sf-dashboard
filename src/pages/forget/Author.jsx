import { useState } from "react";
import authorData from "../../data/authors";

const Author = () => {
  const [currentAuthorName, setCurrentAuthorName] = useState("");

  const handleUpdate = (id) => {
    const category = authorData.find((item) => item.id === id);
    if (category) {
      setCurrentAuthorName(category.name);
      document.getElementById("update_author_modal").showModal();
    }
  };

  const handleDelete = (id) => {
    console.log(`Delete button clicked for user with ID: ${id}`);
  };

  return (
    <div className="flex flex-col items-end gap-6 bg-base-100">
      {/* add author */}
      <div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded transition-all duration-300 ease-in-out"
          onClick={() =>
            document.getElementById("add_author_modal").showModal()
          }
        >
          Add Author
        </button>
      </div>

      {/* Add Modal section */}
      <dialog id="add_author_modal" className="modal modal-middle">
        <div className="modal-box w-fit">
          <form method="dialog" className="flex flex-col gap-4 items-start">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>

            {/* Add category */}
            <div className="flex flex-col gap-4">
              <label
                htmlFor="category-text"
                className="text-[18px] font-semibold"
              >
                Add Author
              </label>
              <input
                type="text"
                id="category-text"
                name="category-text"
                className="bg-white rounded-[10px] h-[48px] w-[280px] pl-4 lg:w-[350px] xl:w-[400px]"
              />
            </div>

            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded transition-all duration-300 ease-in-out">
              Add
            </button>
          </form>
        </div>
      </dialog>

      {/* Update Modal section */}
      <dialog id="update_author_modal" className="modal modal-middle">
        <div className="modal-box w-fit">
          <form method="dialog" className="flex flex-col gap-4 items-start">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <div className="flex flex-col gap-4">
              <label
                htmlFor="update-category-text"
                className="text-[18px] font-semibold"
              >
                Update Author Name
              </label>
              <input
                type="text"
                id="update-category-text"
                name="category-text"
                value={currentAuthorName}
                onChange={(e) => setCurrentAuthorName(e.target.value)}
                className="bg-white rounded-[10px] h-[48px] w-[280px] pl-4 lg:w-[350px] xl:w-[400px]"
              />
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out">
              Update
            </button>
          </form>
        </div>
      </dialog>

      {/* table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Update
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {authorData.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out"
                >
                  Update
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Author;
