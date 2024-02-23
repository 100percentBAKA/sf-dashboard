const ResetForm = () => {
  return (
    <div className="bg-white p-6 lg:p-10 xl:p-12 flex flex-col gap-6 rounded-[10px]">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">Reset Password</div>
        <div>Enter a new password</div>
      </div>

      <div className="flex flex-col gap-2">
        <div>Password</div>
        <input
          type="text"
          className="rounded-[10px] h-[48px] w-[280px] bg-base-100 pl-4 lg:w-[350px] xl:w-[400px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div>New Password</div>
        <input
          type="text"
          className="rounded-[10px] h-[48px] w-[280px] bg-base-100 pl-4 lg:w-[350px] xl:w-[400px]"
        />
      </div>

      <button className="btn btn-primary">Reset</button>
    </div>
  );
};

export default ResetForm;
