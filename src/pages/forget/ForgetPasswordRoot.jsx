import { Outlet } from "react-router-dom";

const ForgetPasswordRoot = () => {
  return (
    <div className="flex w-screen h-screen">
      {/* assets container */}
      <div className="lg:w-[50%] h-[100%]"></div>
      <div className="w-[100%] lg:w-[50%] h-[100%] bg-[#7fa0d959] flex items-center justify-center p-4">
        <div className="flex flex-col gap-10">
          {/* Step */}
          <ul className="steps steps-horizontal">
            <li className="step step-primary">Username</li>
            <li className="step step-primary ">OTP</li>
            <li className="step">Reset</li>
          </ul>

          {/* Login form */}
          <div className="flex items-center justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordRoot;
