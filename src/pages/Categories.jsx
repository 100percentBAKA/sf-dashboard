import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useGetCatsQuery } from "../services/queries";
import ErrorDisplay from "../components/ui/ErrorDisplay";
import toast from "react-hot-toast";
import LoadingModal from "../components/ui/LoadingModal";
import {
  useDelCatMutation,
  usePostCatMutation,
  usePutCatMutation,
} from "../services/mutations";
import { useQueryClient } from "@tanstack/react-query";

const debug = true;

// ! C H E C K - I ( add file size validation )
const CAT_SCHEMA = yup.object().shape({
  category: yup.string().required("Category is required"),
  image: yup
    .mixed()
    .test(
      "fileFormat",
      "Only JPEG, PNG, JPG and WEB files are allowed",
      (value) => {
        if (value) {
          const supportedFormats = ["jpeg", "jpg", "png", "webp"];
          return supportedFormats.includes(value.name.split(".").pop());
        }
      }
    ),
});

const Categories = () => {
  const [currentCategory, setCurrentCategory] = useState("");
  const [deleteID, setDeleteID] = useState(null);

  // * hook for getting categories
  const { data, isPending, isError, error } = useGetCatsQuery();

  //* hook for deleting, posting and updating a category
  const delCatMutation = useDelCatMutation();
  const postCatMutation = usePostCatMutation();
  const putCatMutation = usePutCatMutation();

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

  // * handling onChange for add images
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
  };

  // * handling onChange for update images
  const handleUpdateFileChange = (event) => {
    const file = event.currentTarget.files[0];
    updateFormik.setFieldValue("image", file);
  };

  const handleUpdate = (name) => {
    setCurrentCategory(name);
    handleOpenModal("update");
  };

  const handleDelete = (name, index) => {
    setDeleteID(index);
    delCatMutation.mutate(name, {
      onError: (data) => {
        debug && console.log(`Error deleting category with index: ${index}`);
        setDeleteID(null);
        if (data) toast.error(data.data.detail);
      },

      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["get-all-categories"],
        });
        setDeleteID(null);
        if (data) toast.success(data.data.SUCCESS);
      },
    });
  };

  // * formik form handling for add category
  const formik = useFormik({
    initialValues: {
      category: "",
      image: "",
      description: "This is a placeholder description",
    },
    validationSchema: CAT_SCHEMA,

    onSubmit: () => {
      // * form data to construct request payload for file uploads
      const postData = new FormData();
      postData.append("name", formik.values.category);
      postData.append("description", formik.values.description);
      postData.append("image", formik.values.image);

      debug && console.log(postData);

      postCatMutation.mutate(postData, {
        onError: (data) => {
          debug && console.log(data);
          if (data) toast.error("Error posting category data");
          handleCloseModal("add");
        },

        onSuccess: async (data) => {
          debug && console.log(data);
          if (data) toast.success("Successfully posted category data");
          await queryClient.invalidateQueries({
            queryKey: ["get-all-categories"],
          });
          handleCloseModal("add");
        },
      });
    },
  });

  // * formik form handling for update category
  const updateFormik = useFormik({
    initialValues: {
      category: currentCategory,
      image: "",
      description: "This is a Placeholder description",
    },
    validationSchema: CAT_SCHEMA,

    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.category);
      formData.append("description", values.description);
      formData.append("image", values.image);

      putCatMutation.mutate(formData, {
        onSuccess: async () => {
          toast.success("Category updated successfully");
          handleCloseModal("update");
          await queryClient.invalidateQueries(["get-all-categories"]);
        },

        onError: (error) => {
          toast.error(`Error updating category: ${error.message}`);
          handleCloseModal("update");
        },
      });
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
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/jpeg, image/png"
                  onBlur={formik.handleBlur}
                  onChange={handleFileChange}
                />
                {formik.touched.image && formik.errors.image ? (
                  <div className="text-[12px] text-red-500">
                    {formik.errors.image}
                  </div>
                ) : null}
              </div>

              <button
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded transition-all duration-300 ease-in-out w-[100px]"
                type="submit"
                disabled={postCatMutation.isPending}
              >
                {postCatMutation.isPending ? (
                  <div className="custom-spinner"></div>
                ) : (
                  <div>Add</div>
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Update Modal section */}
      <dialog id="update_cat_modal" className="modal modal-middle">
        <div className="modal-box w-fit">
          <form
            method="dialog"
            className="flex flex-col gap-4 items-start"
            onSubmit={updateFormik.handleSubmit}
          >
            <div
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => handleCloseModal("update")}
            >
              ✕
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="category" className="text-[18px] font-semibold">
                Update Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value)}
                onBlur={updateFormik.handleBlur}
                className="bg-white rounded-[10px] h-[48px] w-[280px] pl-4 lg:w-[350px] xl:w-[400px]"
              />
            </div>

            {/* image upload */}
            <div>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/jpeg, image/png"
                onBlur={updateFormik.handleBlur}
                onChange={handleUpdateFileChange}
              />
              {updateFormik.touched.image && updateFormik.errors.image ? (
                <div className="text-[12px] text-red-500">
                  {updateFormik.errors.image}
                </div>
              ) : null}
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out w-[100px]"
              type="submit"
            >
              {putCatMutation.isPending ? (
                <div className="custom-spinner"></div>
              ) : (
                <div>Update</div>
              )}
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
                  onClick={() => handleUpdate(item.name)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded transition-all duration-300 ease-in-out w-[100px]"
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

export default Categories;
