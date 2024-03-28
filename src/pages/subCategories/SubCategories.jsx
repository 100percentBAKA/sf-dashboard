import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useGetSubCatsQuery } from "../../services/queries";
import { useEffect, useState } from "react";
import LoadingModal from "../../components/ui/LoadingModal";
import toast from "react-hot-toast";
import ErrorDisplay from "../../components/ui/ErrorDisplay";
import { useQueryClient } from "@tanstack/react-query";
import { useDelSubCatMutation } from "../../services/mutations";

// * debug mode
const debug = true;

const SubCategories = () => {
  const [deleteID, setDeleteID] = useState(null);

  const navigate = useNavigate();

  // * for invalidating requests upon successful delete operation
  const queryClient = useQueryClient();

  // * zustand store
  const setCurrentSubCat = useStore((state) => state.setCurrentSubCat);

  // * hook for getting all sub cats
  const { data, isPending, isError, error } = useGetSubCatsQuery();
  //* hook for deleting a category
  const delSubCatMutation = useDelSubCatMutation();

  useEffect(() => {
    debug && !isPending && console.log(data?.data);
  }, [data, isPending]);

  const handleAddClick = () => {
    navigate("/app/sub-categories/add");
  };

  const handleUpdate = (subCat) => {
    setCurrentSubCat(subCat);
    navigate("/app/sub-categories/update");
  };

  const handleDelete = (name, index) => {
    setDeleteID(index);

    delSubCatMutation.mutate(name, {
      onError: (data) => {
        debug && console.log(`Error deleting category with index: ${index}`);
        setDeleteID(null);
        if (data) toast.error(data.data.detail);
      },

      // ! C H E C K  -  I (replace with error message)
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["get-all-sub-categories"],
        });
        setDeleteID(null);
        if (data) toast.success("Category deleted successfully");
      },
    });
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
          Add Sub Category
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
                  onClick={() => handleUpdate(item.name)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out"
                >
                  Update
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(item.name, index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out w-[100px]"
                  disabled={deleteID === index}
                >
                  {deleteID === index ? (
                    <div className="custom-spinner"></div>
                  ) : (
                    <div>DELETE</div>
                  )}
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

export default SubCategories;
