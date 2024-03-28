import LoadingModal from "../../components/ui/LoadingModal";
import ErrorDisplay from "../../components/ui/ErrorDisplay";
import { useNavigate } from "react-router-dom";
import { useGetSubSubCatsQuery } from "../../services/queries";
import { useEffect } from "react";
import toast from "react-hot-toast";

const debug = true;

const SubToSubCategories = () => {
  const navigate = useNavigate();

  // * hook to get all sub to sub categories
  const { data, isPending, isError, error } = useGetSubSubCatsQuery();

  useEffect(() => {
    debug && console.log(data?.data);
  }, [data]);

  const handleAddClick = () => {
    navigate("/app/sub-sub-categories/add");
  };

  if (isError) {
    toast.error(error.message);
    return <ErrorDisplay />;
  }

  return (
    <div className="flex flex-col items-end gap-6 bg-base-100">
      <div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded transition-all duration-300 ease-in-out"
          onClick={handleAddClick}
        >
          Add Sub To Sub Category
        </button>
      </div>

      {/* table */}
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
          {data?.data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={item.image}
                  alt={item.description}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  // onClick={() => handleUpdate(item.id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out"
                >
                  Update
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  // onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <LoadingModal pending={isPending} />
    </div>
  );
};

export default SubToSubCategories;
