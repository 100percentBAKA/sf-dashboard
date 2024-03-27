import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  useForgotMutation,
  usePhoneMutation,
} from "../../services/auth/mutations";
import toast from "react-hot-toast";
import { useStore } from "../../stores/store";

// * DEBUG MODE
const debug = true;

// * GENERIC OTP REASON
const reason = "reset password";

const FORGOT_SCHEMA = yup.object().shape({
  username: yup.string().required("Username is required"),
});

const ForgetForm = () => {
  const navigate = useNavigate();

  //* custom hooks for api handling
  const forgotMutation = useForgotMutation();
  const phoneMutation = usePhoneMutation();

  // * zustand store
  const setUsername = useStore((state) => state.setUsername);
  const setPhoneNo = useStore((state) => state.setPhoneNo);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: FORGOT_SCHEMA,

    onSubmit: () => {
      const forgetData = {
        username: formik.values.username,
        reason: reason,
      };

      forgotMutation.mutate(forgetData, {
        onError: (data) => {
          debug && console.log(data);
          if (data) toast.error(data.message);
        },

        onSuccess: async (data) => {
          debug && console.log(data?.data.Success);

          // ! get user phone number
          await phoneMutation.mutateAsync(
            { username: formik.values.username },
            {
              onError: () => {
                debug && console.log("Error getting user phoneNo");
              },
              onSuccess: (data) => {
                debug &&
                  console.log(`User phone no: ${data?.data.phone_number}`);
                if (data) setPhoneNo(data.data.phone_number);
              },
            }
          );

          if (data) toast.success(data.data.Success);
          setUsername(formik.values.username);
          navigate("/auth/forget/otp");
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
        <div className="text-2xl font-semibold">Welcome</div>
        <div>Input your email or username to reset password</div>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <div>Username</div>

          <div>
            <input
              type="text"
              name="username"
              className="rounded-[10px] h-[48px] w-[280px] bg-base-100 pl-4 lg:w-[350px] xl:w-[400px]"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="custom-error">{formik.errors.username}</div>
            ) : null}
          </div>
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
          <div className="custom-spinner"></div>
        ) : (
          <div>Reset</div>
        )}
      </button>
    </form>
  );
};

export default ForgetForm;
