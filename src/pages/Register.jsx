// import { Link } from "react-router-dom";

const StyledInput = ({ type, ...props }) => {
  return (
    <input
      type={type}
      className="rounded-[10px] h-[48px] w-[280px] bg-base-100 pl-4 lg:w-[350px] xl:w-[400px]"
      {...props}
    />
  );
};

const Register = () => {
  return (
    <div className="flex items-center justify-center">
      <form className="bg-white p-6 lg:p-10 xl:p-12 flex flex-col gap-6 rounded-[10px]">
        <div className="text-2xl font-semibold">Register</div>

        {/* username */}
        <div className="flex flex-col gap-2">
          <div>Username</div>
          <div>
            <StyledInput
              type="text"
              name="username"
              placeholder="Enter username"
            />
          </div>
        </div>

        {/* phone number */}
        <div className="flex flex-col gap-2">
          <div>Phone Number</div>
          <div>
            <StyledInput
              type="number"
              name="phone"
              placeholder="Enter phone no"
            />
          </div>
        </div>

        {/* password */}
        <div className="flex flex-col gap-2">
          <div>Password</div>
          <div>
            <StyledInput
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
        </div>

        {/* retype password */}
        <div className="flex flex-col gap-2">
          <div>Retype Password</div>
          <div>
            <StyledInput
              type="password"
              name="re-password"
              placeholder="Enter password again"
            />
          </div>
        </div>

        {/* Remember me */}
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-xs"
          />
          <div className="text-[14px]">Remember me</div>
        </div>

        {/* sign in */}
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Register;
