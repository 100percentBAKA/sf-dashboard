import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  usePhoneMutation,
  useVerifyOTPMutation,
} from "../../services/auth/mutations";
import toast from "react-hot-toast";
import { useStore } from "../../stores/store";

// * DEBUG MODE
const debug = true;

const OtpForm = () => {
  const [otp, setOtp] = React.useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = React.useState(0);
  const [phoneNo, setPhoneNo] = useState("+919876543210");

  // * obtain username from zustand store
  const username = useStore((state) => state.username);

  const otpMutation = useVerifyOTPMutation();
  const phoneMutation = usePhoneMutation();

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
      e.preventDefault(); // Prevents deleting the character in the focused input
      setActiveOTPIndex(index - 1);
    }
  };

  useEffect(() => {
    if (inputRefs.current[activeOTPIndex]) {
      inputRefs.current[activeOTPIndex].focus();
    }
  }, [activeOTPIndex]);

  // useEffect(() => {
  //   const handleUserPhoneNo = () => {
  //     phoneMutation.mutate(
  //       { username: username },
  //       {
  //         onError: () => {
  //           debug && console.log("Error getting user phone number");
  //         },

  //         onSuccess: (data) => {
  //           debug &&
  //             console.log(`user phone number is: ${data?.data.phone_number}`);
  //           if (data) setPhoneNo(data.data.phone_number);
  //         },
  //       }
  //     );
  //   };

  //   handleUserPhoneNo();
  // }, [setPhoneNo, phoneMutation, username]);

  // ! sending post request logic goes here . . .
  const handleVerifyClick = (e) => {
    e.preventDefault(); // prevent form resubmission

    if (!username) {
      toast.error("Username is required.");
      return;
    }
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

  return (
    <form className="bg-white p-6 lg:p-10 xl:p-12 flex flex-col gap-6 rounded-[10px] max-w-[450px]">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">Email Verification</div>
        <div>
          OTP has been sent to {phoneNo.substring(0, 7)}
          ****
          {phoneNo.substring(8)}
        </div>
      </div>

      {/* OTP boxes */}
      <div className="flex flex-row h-fit items-center justify-between mx-auto w-full gap-2 my-4">
        {otp.map((_, index) => (
          <div className="w-16 h-16" key={index}>
            {" "}
            {/* Adjusted size here */}
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-full h-full text-center text-2xl px-5 outline-none rounded-xl border border-gray-200 bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" // Adjusted font size here
              type="text" // Changed to text to allow leading zeros
              pattern="[0-9]*" // Ensure only numbers can be entered
              inputMode="numeric" // Show numeric keyboard on mobile devices
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              value={otp[index]}
              maxLength={1}
            />
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={handleVerifyClick}>
        {otpMutation.isPending ? (
          <div className="custom-spinner"></div>
        ) : (
          <div>Verify Account</div>
        )}
      </button>

      <div className="text-center">
        Didn&apos;t receive OTP?{" "}
        <span className="text-secondary cursor-pointer">Resend</span>
      </div>
    </form>
  );
};

export default OtpForm;
