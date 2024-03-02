const tableData = [
  { id: 1, name: "image1", imageUrl: "" },
  { id: 2, name: "image2", imageUrl: "" },
  { id: 3, name: "image3", imageUrl: "" },
];

const Categories = () => {
  const handleUpdate = (id) => {
    console.log(`Update button clicked for user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete button clicked for user with ID: ${id}`);
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Image
          </th>
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
        {tableData.map((item) => (
          <tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <img
                className="h-10 w-10 rounded-full"
                src={item.imageUrl}
                alt=""
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => handleUpdate(item.id)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded transition-all duration-300 ease-in-out"
              >
                Update
              </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded transition-all duration-300 ease-in-out"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Categories;
