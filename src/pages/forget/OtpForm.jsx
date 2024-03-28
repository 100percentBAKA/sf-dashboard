import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useForgotMutation,
  useVerifyOTPMutation,
} from "../../services/auth/mutations";
import toast from "react-hot-toast";
import { useStore } from "../../stores/store";
import LoadingModal from "../../components/ui/LoadingModal";

// * DEBUG MODE
const debug = true;

// * GENERIC OTP REASON
const reason = "reset password";

const OtpForm = () => {
  const [otp, setOtp] = React.useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = React.useState(0);

  // * obtain username from zustand store
  const username = useStore((state) => state.username);
  const phoneNo = useStore((state) => state.phoneNo);

  // * custom hooks to handle otp handling
  const otpMutation = useVerifyOTPMutation();
  const forgotMutation = useForgotMutation();

  const inputRefs = React.useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    // Only take the last character if it's not empty to avoid removing content unintentionally.
    value = value.slice(-1);
    const newOTP = [...otp];
    newOTP[index] = value;

    // Automatically move to the next input if the current one is filled.
    if (value) {
      setActiveOTPIndex(Math.min(index + 1, otp.length - 1));
    }

    setOtp(newOTP);
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace when the current box is empty, and there's a box before it.
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      e.preventDefault();
      setActiveOTPIndex(index - 1);
    }
  };

  useEffect(() => {
    if (inputRefs.current[activeOTPIndex]) {
      inputRefs.current[activeOTPIndex].focus();
    }
  }, [activeOTPIndex]);

  // ! sending post request logic goes here . . .
  const handleVerifyClick = (e) => {
    e.preventDefault();
    debug && console.log(otp.join(""));

    const otpData = {
      username: username,
      otp: otp.join(""),
    };

    debug && console.log(otpData);

    otpMutation.mutate(otpData, {
      onError: (data) => {
        debug && console.log(data?.data.error);
        if (data) toast.error(data.data.error);
      },

      onSuccess: (data) => {
        debug && console.log(data?.data.success);
        if (data) toast.success(data.data.Success);
        navigate("/auth/forget/reset");
      },
    });
  };

  const handleResendOTP = () => {
    const resendData = {
      username: username,
      reason: reason,
    };

    forgotMutation.mutate(resendData, {
      onError: (data) => {
        debug && console.log(data);
        if (data) toast.error(data.message);
      },

      onSuccess: (data) => {
        debug && console.log(data);
        if (data) toast.success(data.data.Success);
      },
    });
  };

  return (
    <form className="bg-white p-6 lg:p-10 xl:p-12 flex flex-col gap-6 rounded-[10px] max-w-[450px]">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">Email Verification</div>
        <div>
          OTP has been sent to {phoneNo.substring(0, 4)}
          *****
          {phoneNo.substring(9)}
        </div>
      </div>

      {/* OTP boxes */}
      <div className="flex flex-row h-fit items-center justify-between mx-auto w-full gap-2 my-4">
        {otp.map((_, index) => (
          <div className="w-16 h-16" key={index}>
            {" "}
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-full h-full text-center text-2xl px-5 outline-none rounded-xl border border-gray-200 bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              value={otp[index]}
              maxLength={1}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center space-y-2">
        <button className="btn btn-primary w-full" onClick={handleVerifyClick}>
          {otpMutation.isPending ? (
            <div className="custom-spinner"></div>
          ) : (
            <div>Verify Account</div>
          )}
        </button>
        <Link to="/auth/login" className="custom-link">
          Back to login
        </Link>
      </div>

      <div className="text-center">
        Didn&apos;t receive OTP?{" "}
        <span
          className="text-secondary cursor-pointer"
          onClick={handleResendOTP}
        >
          Resend
        </span>
      </div>

      <LoadingModal pending={forgotMutation.isPending} />
    </form>
  );
};

export default OtpForm;
