import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "../../assets/styles/Categories.module.css";

// Define a validation schema
const SubToSubCategoriesSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub category is required"),
  subToSubCategoryName: Yup.string().required(
    "Sub to sub category name is required"
  ),
  description: Yup.string().required("Description is required"),
});

const AddS2SC = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <Formik
        initialValues={{
          category: "",
          subCategory: "",
          subToSubCategoryName: "",
          description: "",
        }}
        validationSchema={SubToSubCategoriesSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex-col space-y-2 mb-10">
              <label htmlFor="category" className="text-[18px] font-semibold">
                Select Category
              </label>
              <Field
                as="select"
                name="category"
                className="select w-full"
                id="category"
              >
                <option disabled value="">
                  Select Category
                </option>
                {/* Add your categories here */}
              </Field>
              {errors.category && touched.category ? (
                <div className={styles["error-display"]}>{errors.category}</div>
              ) : null}
            </div>

            <div className="flex-col space-y-2 mb-10">
              <label
                htmlFor="subCategory"
                className="text-[18px] font-semibold"
              >
                Select Sub Category
              </label>
              <Field
                as="select"
                name="subCategory"
                className="select w-full"
                id="subCategory"
              >
                <option disabled value="">
                  Select Sub Category
                </option>
                {/* Add your sub categories here */}
              </Field>
              {errors.subCategory && touched.subCategory ? (
                <div className={styles["error-display"]}>
                  {errors.subCategory}
                </div>
              ) : null}
            </div>

            <div className="flex-col space-y-2 mb-10">
              <label
                htmlFor="subToSubCategoryName"
                className="text-[18px] font-semibold"
              >
                Enter Sub to Sub Category Name
              </label>
              <Field
                type="text"
                name="subToSubCategoryName"
                placeholder="Enter Sub to Sub Category Name"
                className="input w-full"
              />
              {errors.subToSubCategoryName && touched.subToSubCategoryName ? (
                <div className={styles["error-display"]}>
                  {errors.subToSubCategoryName}
                </div>
              ) : null}
            </div>

            {/* <div className="flex-col space-y-2 mb-10">
              <label
                htmlFor="description"
                className="text-[18px] font-semibold"
              >
                Enter Description
              </label>
              <Field
                as="textarea"
                name="description"
                placeholder="Enter Description"
                className="input w-full h-[100px]"
              />
              {errors.description && touched.description ? (
                <div className={styles["error-display"]}>
                  {errors.description}
                </div>
              ) : null}
            </div> */}

            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddS2SC;
