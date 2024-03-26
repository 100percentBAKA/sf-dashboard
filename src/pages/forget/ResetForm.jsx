import { useFormik } from "formik";
import * as yup from "yup";
import { useResetMutation } from "../../services/auth/mutations";
import { useStore } from "../../stores/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const debug = true;

const RESET_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Retype password is required"),
});

const ResetForm = () => {
  const resetMutation = useResetMutation();

  const navigate = useNavigate();

  // * obtain username from zustand store
  const username = useStore((state) => state.username);

  const formik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
    },

    validationSchema: RESET_SCHEMA,

    onSubmit: () => {
      const resetData = {
        username: username,
        new_password: formik.values.password,
      };

      debug && console.log(resetData);
      resetMutation.mutate(resetData, {
        onError: (data) => {
          debug && console.log(data);
          if (data) toast.error(data.message);
        },

        onSuccess: (data) => {
          debug && console.log(data?.data.Success);
          if (data) toast.success(data.data.Success);
          navigate("/auth/login");
        },
      });
    },
  });

  return (
    <form
      className="bg-white p-6 lg:p-10 xl:p-12 flex flex-col gap-6 rounded-[10px]"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">Reset Password</div>
        <div>Enter a new password</div>
      </div>

      <div className="flex flex-col gap-2">
        <div>New Password</div>

        <div>
          <input
            type="text"
            className="rounded-[10px] h-[48px] w-[280px] bg-base-100 pl-4 lg:w-[350px] xl:w-[400px]"
            name="password"
            id="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="custom-error">{formik.errors.password}</div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div>Retype Password</div>

        <div>
          <input
            type="text"
            className="rounded-[10px] h-[48px] w-[280px] bg-base-100 pl-4 lg:w-[350px] xl:w-[400px]"
            name="rePassword"
            id="rePassword"
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="custom-error">{formik.errors.rePassword}</div>
          ) : null}
        </div>
      </div>

      <button className="btn btn-primary" type="submit">
        {resetMutation.isPending ? (
          <div className="custom-spinner"></div>
        ) : (
          <div>Reset</div>
        )}
      </button>
    </form>
  );
};

export default ResetForm;
