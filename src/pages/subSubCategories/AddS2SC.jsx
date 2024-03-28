import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetCatsQuery, useGetSubCatsQuery } from "../../services/queries";
import toast from "react-hot-toast";
import ErrorDisplay from "../../components/ui/ErrorDisplay";

const debug = true;

const SubToSubCategoriesSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub category is required"),
  subToSubCategoryName: Yup.string().required(
    "Sub to sub category name is required"
  ),
  image: Yup.mixed().test(
    "fileFormat",
    "Only JPEG, PNG, JPG, and WEBP files are allowed",
    (value) => {
      if (value) {
        const supportedFormats = ["jpeg", "jpg", "png", "webp"];
        return supportedFormats.includes(
          value.name.split(".").pop().toLowerCase()
        );
      }
      return true; // Allows the field to be optional
    }
  ),
});

const AddS2SC = () => {
  // const navigate = useNavigate();

  // * hooks to get categories and sub categories
  const { data: catsData, isError: isCatsError } = useGetCatsQuery();
  const { data: subData, isError: isSubCatsError } = useGetSubCatsQuery();

  useEffect(() => {
    if (catsData && subData) {
      debug && console.log(catsData.data);
      debug && console.log(subData.data);
    }
  }, [catsData, subData]);

  const formik = useFormik({
    initialValues: {
      category: "",
      subCategory: "",
      subToSubCategoryName: "",
      image: null,
      description: "This is a placeholder description",
    },
    validationSchema: SubToSubCategoriesSchema,
    onSubmit: (values) => {
      // Submit logic goes here
      console.log(values);
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
  };

  if (isCatsError || isSubCatsError) {
    toast.error("Error retrieving data");
    return <ErrorDisplay />;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex-col space-y-2 mb-10">
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
            {catsData?.data.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="text-[12px] text-red-500">
              {formik.errors.category}
            </div>
          )}
        </div>

        <div className="flex-col space-y-2 mb-10">
          <label htmlFor="subCategory" className="text-[18px] font-semibold">
            Select Sub Category
          </label>
          <select
            name="subCategory"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subCategory}
            className="select w-full"
            id="subCategory"
          >
            <option disabled value="">
              Select Sub Category
            </option>
            {subData?.data.map((sub, index) => (
              <option key={index} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
          {formik.touched.subCategory && formik.errors.subCategory && (
            <div className="text-[12px] text-red-500">
              {formik.errors.subCategory}
            </div>
          )}
        </div>

        <div className="flex-col space-y-2 mb-10">
          <label
            htmlFor="subToSubCategoryName"
            className="text-[18px] font-semibold"
          >
            Enter Sub to Sub Category Name
          </label>
          <input
            type="text"
            name="subToSubCategoryName"
            placeholder="Enter Sub to Sub Category Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subToSubCategoryName}
            className="input w-full"
          />
          {formik.touched.subToSubCategoryName &&
            formik.errors.subToSubCategoryName && (
              <div className="text-[12px] text-red-500">
                {formik.errors.subToSubCategoryName}
              </div>
            )}
        </div>

        <div className="flex-col space-y-2 mb-10">
          <input
            type="file"
            name="image"
            id="image"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleFileChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.image && formik.errors.image && (
            <div className="text-[12px] text-red-500">
              {formik.errors.image}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddS2SC;
