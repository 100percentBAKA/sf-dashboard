import { useNavigate } from "react-router-dom";

const Book = () => {
  const navigate = useNavigate();

  const handleAddBookCat = () => {
    navigate(`/app/add-book`);
  };

  return (
    <div className="flex flex-col items-end gap-6 bg-base-100">
      {/* add book category */}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded transition-all duration-300 ease-in-out"
        onClick={handleAddBookCat}
      >
        Add Book
      </button>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Book Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Book Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Book Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Book Description
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
          <tr>
            <td className="px-6 py-4">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="url"
                alt="alt"
              />
            </td>
            <td className="px-6 py-4">Book Name</td>
            <td className="px-6 py-4">$399</td>
            <td className="px-6 py-4 max-w-[120px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
              voluptas veritatis vero facere quod laborum excepturi voluptatem
              dolor tempora accusamus.
            </td>
            <td className="px-6 py-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out">
                Update
              </button>
            </td>
            <td className="px-6 py-4">
              <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Book;
