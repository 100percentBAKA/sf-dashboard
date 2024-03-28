// import { Link } from "react-router-dom";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../services/auth/mutations";
import { useAuth } from "../context/AuthContext";

//* DEBUG MODE
const debug = true;

const StyledInput = ({ type, ...props }) => {
  return (
    <input
      type={type}
      className="rounded-[10px] h-[48px] w-[280px] bg-base-100 pl-4 lg:w-[350px] xl:w-[400px]"
      {...props}
    />
  );
};

StyledInput.propTypes = {
  type: PropTypes.string.isRequired,
};

StyledInput.defaultProps = {
  type: "text",
};

//* REGISTER SCHEMA
const REGISTER_SCHEMA = yup.object().shape({
  username: yup.string().required("Username is required"),
  phone: yup
    .string()
    .max(10, "Enter your 10 digits phone number")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Retype password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const { login, persist, setPersist } = useAuth();

  // * custom register mutation hook
  const registerMutation = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      password: "",
      rePassword: "",
    },

    validationSchema: REGISTER_SCHEMA,

    onSubmit: () => {
      const registerData = {
        username: formik.values.username,
        password: formik.values.password,
        phone_number: `+91${formik.values.phone}`,
      };
      debug && console.log(registerData);

      registerMutation.mutate(registerData, {
        onError: (data) => {
          debug && console.log(data);
          if (data) toast.error(data.message);
        },

        onSuccess: (data) => {
          debug && console.log(data);
          toast.success(data.data.Success);
          if (data) {
            // ! use login method through out auth
            login(data.data.access, data.data.refresh);
          }
          navigate("/app/dashboard");
        },
      });
    },
  });

  const handleCheckBoxChange = (event) => {
    debug && console.log(event.target.checked);
    setPersist(event.target.checked);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="bg-white p-6 lg:p-10 xl:p-12 flex flex-col gap-6 rounded-[10px]"
        onSubmit={formik.handleSubmit}
      >
        <div className="text-2xl font-semibold">Register</div>

        {/* username */}
        <div className="flex flex-col gap-2">
          <div>Username</div>
          <div>
            <StyledInput
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-[12px] text-red-500">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
        </div>

        {/* phone number */}
        <div className="flex flex-col gap-2">
          <div>Phone Number</div>
          <div>
            <StyledInput
              type="number"
              name="phone"
              placeholder="Enter phone no"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-[12px] text-red-500">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>
        </div>

        {/* password */}
        <div className="flex flex-col gap-2">
          <div>Password</div>
          <div>
            <StyledInput
              type="password"
              name="password"
              placeholder="Enter password"
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
        </div>

        {/* retype password */}
        <div className="flex flex-col gap-2">
          <div>Retype Password</div>
          <div>
            <StyledInput
              type="password"
              name="rePassword"
              placeholder="Enter password again"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
            />
            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div className="text-[12px] text-red-500">
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>
        </div>

        {/* Remember me */}
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={persist}
            className="checkbox checkbox-xs"
            onChange={(e) => handleCheckBoxChange(e)}
          />
          <div className="text-[14px]">Remember me</div>
        </div>

        {/* sign up */}
        <div className="flex flex-col items-center space-y-2">
          <button type="submit" className="btn btn-primary w-full">
            {registerMutation.isPending ? (
              <div className="loading loading-spinner loading-md"></div>
            ) : (
              <div>Sign Up</div>
            )}
          </button>

          {/* go to sign up */}
          <Link className="text-[14px] text-center underline" to="/auth/login">
            Already Registered ?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
