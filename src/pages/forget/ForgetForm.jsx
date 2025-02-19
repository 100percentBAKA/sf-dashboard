import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForgotMutation } from "../../services/auth/mutations";
import toast from "react-hot-toast";

// * DEBUG MODE
const debug = true;

const FORGOT_SCHEMA = yup.object().shape({
  username: yup.string().required("Username is required"),
});

const ForgetForm = () => {
  const navigate = useNavigate();
  const forgotMutation = useForgotMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: FORGOT_SCHEMA,

    onSubmit: () => {
      debug && console.log(formik.values);
      forgotMutation.mutate(
        { username: formik.values.username },
        {
          onError: (data) => {
            debug && console.log(data);
            if (data) toast.error(data.message);
          },

          onSuccess: (data) => {
            debug && console.log(data?.data.Success);
            if (data) toast.success(data.data.Success);
            navigate("/auth/forget/otp");
          },
        }
      );
    },
  });

  return (
    <form
      className="bg-white p-6 lg:p-10 xl:p-12 flex flex-col gap-6 rounded-[10px]"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">Welcome</div>
        <div>Input your email or username to reset password</div>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <div>Username</div>
          <input
            type="text"
            name="username"
            className="rounded-[10px] h-[48px] w-[280px] bg-base-100 pl-4 lg:w-[350px] xl:w-[400px]"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="divider">OR</div>
        <div className="flex flex-col gap-2">
          <div>Phone Number</div>
          <input
            type="tel"
            className="rounded-[10px] h-[48px] w-[280px] bg-base-100 pl-4 lg:w-[350px] xl:w-[400px]"
            maxLength={10}
            disabled={true}
          />
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        {forgotMutation.isPending ? (
          <div className="loading loading-spinner loading-md"></div>
        ) : (
          <div>Reset</div>
        )}
      </button>
    </form>
  );
};

export default ForgetForm;
