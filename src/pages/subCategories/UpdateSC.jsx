import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useGetCatsQuery } from "../../services/queries";
import { useEffect } from "react";
import LoadingModal from "../../components/ui/LoadingModal";
import toast from "react-hot-toast";
import ErrorDisplay from "../../components/ui/ErrorDisplay";
import { useStore } from "../../stores/store";

// * debug mode
const debug = true;

const SUB_CAT_SCHEMA = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  subCategoryName: Yup.string().required("Sub category name is required"),
});

const AddSC = () => {
  const navigate = useNavigate();

  // * obtain currentSubCat from zustand store
  const currentSubCat = useStore((state) => state.currentSubCat);

  // * custom hook to get all categories
  const { data, isPending, isError, error } = useGetCatsQuery();

  useEffect(() => {
    debug &&
      !isPending &&
      console.log(data?.data.map((cat) => console.log(cat.name)));
  }, [data, isPending]);

  const formik = useFormik({
    initialValues: {
      category: "",
      subCategoryName: currentSubCat,
    },
    validationSchema: SUB_CAT_SCHEMA,

    onSubmit: (values) => {
      console.log(values);
      navigate(-1);
    },
  });

  if (isError) {
    toast.error(error.message);
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

        <div className="flex-col space-y-2 mb-10">
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

        <button type="submit" className="btn btn-primary w-full">
          Update
        </button>
      </form>

      <LoadingModal pending={isPending} />
    </div>
  );
};

export default AddSC;
