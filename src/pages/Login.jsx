import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";

// LOGIN SCHEMA
const LOGIN_SCHEMA = yup.object().shape({
  usernameEmail: yup.string().required("Username or Email is required"),
  password: yup.string().required("Password is required"),
});

const StyledInputText = ({ ...props }) => {
  return (
    <input
      type="text"
      className="rounded-[10px] h-[48px] w-[280px] bg-base-100 pl-4 lg:w-[350px] xl:w-[400px]"
      {...props}
    />
  );
};

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      usernameEmail: "",
      password: "",
    },

    validationSchema: LOGIN_SCHEMA,

    onSubmit: (values) => {
      console.log(values);
      navigate("/");
    },
  });

  return (
    <div className="flex w-screen h-screen">
      {/* assets container */}
      <div className="w-[65%] h-[100%] flex flex-col gap-6 justify-center">
        {/* <div className="lg:w-[300px] lg:h-[300px] xl:w-[400px] xl:h-[400px] bg-slate-300 flex items-center justify-center">
          Thumbnail
        </div>
        <div className="text-3xl">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, atque.
        </div> */}
      </div>
      <div className="w-[35%] h-[100%] bg-[#7fa0d959]"></div>

      {/* Login form */}
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 lg:p-10 xl:p-12 flex flex-col gap-6 rounded-[10px] absolute top-[18%] right-[3.5%] lg:right-[9%] xl:right-[18%]"
      >
        <div className="text-2xl font-semibold">Welcome</div>

        {/* username or email */}
        <div className="flex flex-col gap-2">
          <div>Username or Email</div>
          <div>
            <StyledInputText
              name="usernameEmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.usernameEmail}
            />
            {formik.touched.usernameEmail && formik.errors.usernameEmail ? (
              <div className="text-[12px] text-red-500">
                {formik.errors.usernameEmail}
              </div>
            ) : null}
          </div>
        </div>

        {/* password */}
        <div className="flex flex-col gap-2">
          <div>Password</div>
          <div>
            <StyledInputText
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-[12px] text-red-500">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-xs"
            />
            <div>Remember me</div>
          </div>
        </div>

        {/* sign in */}
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
