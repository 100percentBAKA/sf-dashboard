import { useNavigate } from "react-router-dom";

const ForgetForm = () => {
  const navigate = useNavigate();
  const handleResetBtnClick = () => {
    navigate("/auth/forget/otp");
  };

  return (
    <form className="bg-white p-6 lg:p-10 xl:p-12 flex flex-col gap-6 rounded-[10px]">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">Welcome</div>
        <div>Input your email or username to reset password</div>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <div>Username</div>
          <input
            type="text"
            className="rounded-[10px] h-[48px] w-[280px] bg-base-100 pl-4 lg:w-[350px] xl:w-[400px]"
          />
        </div>
        <div className="divider">OR</div>
        <div className="flex flex-col gap-2">
          <div>Phone Number</div>
          <input
            type="tel"
            className="rounded-[10px] h-[48px] w-[280px] bg-base-100 pl-4 lg:w-[350px] xl:w-[400px]"
            maxLength={10}
          />
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleResetBtnClick}>
        Reset
      </button>
    </form>
  );
};

export default ForgetForm;
