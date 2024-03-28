import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useGetCatsQuery } from "../../services/queries";
import { useEffect } from "react";
import LoadingModal from "../../components/ui/LoadingModal";
import toast from "react-hot-toast";
import ErrorDisplay from "../../components/ui/ErrorDisplay";
import { usePostSubCatMutation } from "../../services/mutations";
import { useQueryClient } from "@tanstack/react-query";

// * debug mode
const debug = true;

const SUB_CAT_SCHEMA = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  subCategoryName: Yup.string().required("Sub category name is required"),
  image: Yup.mixed().test(
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

const AddSC = () => {
  const navigate = useNavigate();

  // * custom hook to get all categories
  const { data, isPending, isError, error } = useGetCatsQuery();
  // * custom hook to post sub category
  const postSubMutation = usePostSubCatMutation();

  // * for invalidating requests upon successful delete operation
  const queryClient = useQueryClient();

  useEffect(() => {
    debug &&
      !isPending &&
      console.log(data?.data.map((cat) => console.log(cat.name)));
  }, [data, isPending]);

  const formik = useFormik({
    initialValues: {
      category: "",
      subCategoryName: "",
      description: "This is a placeholder description",
      image: "",
    },
    validationSchema: SUB_CAT_SCHEMA,

    onSubmit: (values) => {
      const postData = new FormData();
      postData.append("name", values.subCategoryName);
      postData.append("category", values.category);
      postData.append("description", values.description);
      postData.append("image", values.image);

      debug && console.log(postData);

      postSubMutation.mutate(postData, {
        onError: (data) => {
          debug && console.log(data);
          toast.error("Error posting sub category");
        },

        onSuccess: async (data) => {
          debug && console.log(data);
          await queryClient.invalidateQueries({
            queryKey: ["get-all-sub-categories"],
          });
          if (data) toast.success("Successfully posted sub category data");
          navigate(-1);
        },
      });
    },
  });

  // * handling onChange for add images
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
  };

  if (isError) {
    toast.error(error.message);
    return <ErrorDisplay />;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-10">
        <div className="flex-col space-y-2">
          <label htmlFor="category" className="text-[18px] font-semibold">
            Select Category
          </label>
          <select
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            className="select w-full"
            id="category"
          >
            <option disabled value="">
              Select Category
            </option>
            {data?.data.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div className="text-[12px] text-red-500">
              {formik.errors.category}
            </div>
          ) : null}
        </div>

        <div className="flex-col space-y-2">
          <label
            htmlFor="subCategoryName"
            className="text-[18px] font-semibold"
          >
            Enter Sub Category Name
          </label>
          <input
            name="subCategoryName"
            type="text"
            placeholder="Enter Sub Category Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subCategoryName}
            className="input w-full"
          />
          {formik.touched.subCategoryName && formik.errors.subCategoryName ? (
            <div className="text-[12px] text-red-500">
              {formik.errors.subCategoryName}
            </div>
          ) : null}
        </div>

        {/* image upload */}
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
          type="submit"
          className="btn btn-primary w-full"
          disabled={postSubMutation.isPending}
        >
          {postSubMutation.isPending ? (
            <div className="custom-spinner"></div>
          ) : (
            <div>Add</div>
          )}
        </button>
      </form>

      <LoadingModal pending={isPending} />
    </div>
  );
};

export default AddSC;
