import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/app/dashboard");
  };

  return (
    <div className="bg-base-100 w-full h-[100vh] flex items-center justify-center">
      <main className="grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 w-fit rounded-xl shadow-xl">
        <div className="text-center">
          <p className="text-base font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button className="btn btn-primary" onClick={handleBackClick}>
              Go Back
            </button>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageNotFound;
