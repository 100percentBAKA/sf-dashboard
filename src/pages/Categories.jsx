import { useEffect, useState } from "react";
import { tableData } from "../data/categories";
import * as yup from "yup";
import { useFormik } from "formik";
import { useGetCatsQuery } from "../services/queries";
import ErrorDisplay from "../components/ui/ErrorDisplay";
import toast from "react-hot-toast";
import LoadingModal from "../components/ui/LoadingModal";
import { useDelCatMutation } from "../services/mutations";
import { useQueryClient } from "@tanstack/react-query";

const debug = true;

const CAT_SCHEMA = yup.object().shape({
  category: yup.string().required("Category is required"),
  // image: yup
  //   .mixed()
  //   .file("A file is required")
  //   .maxFileSize(1024 * 1024 * 5, "File size must be less than 5MB")
  //   .fileType(["image/jpeg", "image/png"], "Unsupported File Format"),
});

const Categories = () => {
  const [currentCategoryName, setCurrentCategoryName] = useState("");
  const [deleteID, setDeleteID] = useState(null);

  // * hook for getting categories
  const { data, isPending, isError, error } = useGetCatsQuery();
  //* hook for delete a category
  const delCatMutation = useDelCatMutation();

  // * for invalidating requests upon successful delete operation
  const queryClient = useQueryClient();

  useEffect(() => {
    debug && !isPending && console.log(data?.data);
  }, [data, isPending]);

  const handleCloseModal = (element) => {
    document
      .getElementById(`${element}_cat_modal`)
      .classList.remove("modal-open");
  };

  const handleOpenModal = (element) => {
    document.getElementById(`${element}_cat_modal`).classList.add("modal-open");
  };

  // * handling onChange for images
  // const handleFileChange = (event) => {
  //   const file = event.currentTarget.files[0];
  //   formik.setFieldValue("image", file);
  // };

  const handleUpdate = (id) => {
    const category = tableData.find((item) => item.id === id);
    if (category) {
      setCurrentCategoryName(category.name);
      handleOpenModal("update");
    }
  };

  const handleDelete = (name, index) => {
    setDeleteID(index);
    delCatMutation.mutate(name, {
      onError: (data) => {
        debug && console.log(`Error deleting category with index: ${index}`);
        setDeleteID(null);
        if (data) toast.error(data.data.detail);
      },

      // ! C H E C K  -  I (replace with error message)
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["get-all-categories"],
        });
        setDeleteID(null);
        if (data) toast.success("Category deleted successfully");
      },
    });
  };

  // * formik form handling
  const formik = useFormik({
    initialValues: {
      category: "",
      // image: undefined,
    },
    validationSchema: CAT_SCHEMA,

    onSubmit: () => {
      debug && console.log("Add button clicked");
      handleCloseModal("add");
    },
  });

  if (isError) {
    toast.error(error.message);
    return <ErrorDisplay />;
  }

  return (
    <div className="flex flex-col items-end gap-6 bg-base-100">
      {/* Add category button */}
      <div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded transition-all duration-300 ease-in-out"
          onClick={() => handleOpenModal("add")}
        >
          Add Category
        </button>
      </div>

      {/* Add Modal section */}
      <dialog id="add_cat_modal" className="modal modal-middle">
        <div className="modal-box w-fit">
          <form method="dialog" onSubmit={formik.handleSubmit}>
            <div
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => handleCloseModal("add")}
            >
              ✕
            </div>

            <div className="flex flex-col gap-4 items-start">
              {/* Add category */}
              <label htmlFor="category" className="text-[18px] font-semibold">
                Add Category
              </label>

              {/* add category */}
              <div>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="bg-white rounded-[10px] h-[48px] w-[280px] pl-4 lg:w-[350px] xl:w-[400px]"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Add Category"
                />
                {formik.touched.category && formik.errors.category ? (
                  <div className="text-[12px] text-red-500">
                    {formik.errors.category}
                  </div>
                ) : null}
              </div>

              {/* add image upload */}
              <div>
                <label htmlFor="image">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/jpeg, image/png"
                  // onBlur={formik.handleBlur}
                  // onChange={handleFileChange}
                />
                {/* {formik.touched.image && formik.errors.image ? (
                  <div className="text-[12px] text-red-500">
                    {formik.errors.image}
                  </div>
                ) : null} */}
              </div>

              <button
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded transition-all duration-300 ease-in-out"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Update Modal section */}
      <dialog id="update_cat_modal" className="modal modal-middle">
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
                Update Category
              </label>
              <input
                type="text"
                id="update-category-text"
                name="category-text"
                value={currentCategoryName}
                onChange={(e) => setCurrentCategoryName(e.target.value)}
                className="bg-white rounded-[10px] h-[48px] w-[280px] pl-4 lg:w-[350px] xl:w-[400px]"
              />
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out">
              Update
            </button>
          </form>
        </div>
      </dialog>

      {/* Table section */}
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
                  onClick={() => handleUpdate(index)}
                  className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out"
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
                    <div className="loading loading-spinner loading-md"></div>
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

export default Categories;
