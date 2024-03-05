import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "../assets/styles/Categories.module.css";

const SubCategoriesSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  subCategoryName: Yup.string().required("Sub category name is required"),
  description: Yup.string().required("Description is required"),
});

const SubCategories = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <Formik
        initialValues={{
          category: "",
          subCategoryName: "",
          description: "",
        }}
        validationSchema={SubCategoriesSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Handle form submission
          console.log(values);
          setSubmitting(false);
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
                <option value="category-1">Category 1</option>
                <option value="category-2">Category 2</option>
                <option value="category-3">Category 3</option>
                <option value="category-4">Category 4</option>
                <option value="category-5">Category 5</option>
              </Field>
              {errors.category && touched.category ? (
                <div className={styles["error-display"]}>{errors.category}</div>
              ) : null}
            </div>

            <div className="flex-col space-y-2 mb-10">
              <label
                htmlFor="subCategoryName"
                className="text-[18px] font-semibold"
              >
                Enter Sub Category Name
              </label>
              <Field
                name="subCategoryName"
                type="text"
                placeholder="Enter Sub Category Name"
                className="input w-full"
              />
              {errors.subCategoryName && touched.subCategoryName ? (
                <div className={styles["error-display"]}>
                  {errors.subCategoryName}
                </div>
              ) : null}
            </div>

            <div className="flex-col space-y-2 mb-10">
              <label
                htmlFor="description"
                className="text-[18px] font-semibold"
              >
                Enter Description
              </label>
              <Field
                name="description"
                as="textarea"
                placeholder="Enter Description"
                className="input w-full h-[100px]"
              />
              {errors.description && touched.description ? (
                <div className={styles["error-display"]}>
                  {errors.description}
                </div>
              ) : null}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubCategories;
