import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import * as yup from "yup";

// * debug mode
// const debug = true;

const ADD_BOOK_SCHEMA = yup.object().shape({
  name: yup.string().required("Book name is required"),
  price: yup
    .string()
    .max(8, "Can be of maximum 8 digits only")
    .required("Price of the book is required"),
  description: yup.string().required("Book Description is required"),
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

const AddSC = () => {
  //   const navigate = useNavigate();

  // * handling onChange for add images
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      image: "",
    },
    validationSchema: ADD_BOOK_SCHEMA,

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-10">
        <div className="flex-col space-y-2">
          <label htmlFor="category" className="text-[18px] font-semibold">
            Enter Book Name
          </label>
          <input
            name="name"
            placeholder="Enter the book name"
            type="text"
            className="input w-full"
          />

          {formik.touched.name && formik.errors.name ? (
            <div className="custom-error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="flex-col space-y-2">
          <label
            htmlFor="subCategoryName"
            className="text-[18px] font-semibold"
          >
            Enter Book price
          </label>
          <input
            name="price"
            type="text"
            placeholder="Enter Book price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            className="input w-full"
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="custom-error">{formik.errors.price}</div>
          ) : null}
        </div>

        {/* book description */}
        <div className="flex-col space-y-2">
          <label
            htmlFor="subCategoryName"
            className="text-[18px] font-semibold"
          >
            Enter Book description
          </label>
          <input
            name="price"
            type="text"
            placeholder="Enter Book description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="input w-full"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="custom-error">{formik.errors.description}</div>
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
            <div className="custom-error">{formik.errors.image}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddSC;
