/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useEffect } from "react";

const OtpForm = () => {
  const [otp, setOtp] = React.useState(new Array(4).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = React.useState(0);
  const inputRefs = React.useRef([]);

  const handleChange = (index, value) => {
    value = value.slice(-1);
    const newOTP = [...otp];
    newOTP[index] = value;

    if (value === "") {
      setActiveOTPIndex(index - 1);
    } else {
      setActiveOTPIndex(index + 1);
    }

    setOtp(newOTP);
  };

  useEffect(() => {
    if (inputRefs.current[activeOTPIndex]) {
      inputRefs.current[activeOTPIndex].focus();
    }
  }, [activeOTPIndex]);

  return (
    <form className="bg-white p-6 lg:p-10 xl:p-12 flex flex-col gap-6 rounded-[10px]">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">Email Verification</div>
        <div>OTP has been sent to xy***@gmail.com</div>
      </div>

      {/* OTP boxes */}
      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs gap-2 my-4">
        {otp.map((_, index) => (
          <div className="w-14 h-14" key={index}>
            <input
              ref={(input) => (inputRefs.current[index] = input)}
              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              type="number"
              name=""
              id=""
              onChange={(e) => handleChange(index, e.target.value)}
              value={otp[index]}
              maxLength={1}
            />
          </div>
        ))}
      </div>

      <button className="btn btn-primary">Verify Account</button>

      <div className="text-center">
        Didn't receive otp?{" "}
        <span className="text-secondary cursor-pointer">Resend</span>
      </div>
    </form>
  );
};

export default OtpForm;
