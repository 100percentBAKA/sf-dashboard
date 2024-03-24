import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/auth/mutations";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

//* DEBUG
const debug = true;

//* LOGIN SCHEMA
const LOGIN_SCHEMA = yup.object().shape({
  username: yup.string().required("Username is required"),
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
  const { login, persist, setPersist } = useAuth();

  // * custom login mutation hook
  const loginMutation = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: LOGIN_SCHEMA,

    onSubmit: () => {
      const loginData = {
        username: formik.values.username,
        password: formik.values.password,
      };
      debug && console.log(loginData);

      loginMutation.mutate(loginData, {
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
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 lg:p-10 xl:p-12 flex flex-col gap-6 rounded-[10px]"
      >
        <div className="text-2xl font-semibold">Welcome</div>

        {/* username */}
        <div className="flex flex-col gap-2">
          <div>Username</div>
          <div>
            <StyledInputText
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-[12px] text-red-500">
                {formik.errors.username}
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

          {/* remember me */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={persist}
                className="checkbox checkbox-xs"
                onChange={(e) => handleCheckBoxChange(e)}
              />
              <div className="text-[14px]">Remember me</div>
            </div>

            <Link to="/auth/forget" className="text-[14px]">
              Forget Password?
            </Link>
          </div>
        </div>

        {/* sign in */}
        <div className="flex flex-col items-center space-y-2">
          <button className="btn btn-primary w-full" type="submit">
            {loginMutation.isPending ? (
              <div className="loading loading-spinner loading-md"></div>
            ) : (
              <div>Sign In</div>
            )}
          </button>

          {/* go to sign up */}
          <Link
            className="text-[14px] text-center underline"
            to="/auth/register"
          >
            Yet to Register ?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
