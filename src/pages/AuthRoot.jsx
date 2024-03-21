import { Outlet } from "react-router-dom";

const AuthRoot = () => {
  return (
    <div className="flex w-screen h-screen">
      {/* assets container */}
      <div className="lg:w-[50%] h-[100%] flex flex-col gap-6 justify-center"></div>
      <div className="w-[100%] lg:w-[50%] h-[100%] bg-[#7fa0d959] flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthRoot;
