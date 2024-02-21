import React from "react";

/* eslint-disable react/prop-types */
const Toast = ({ message, status }) => {
  const [show, setShow] = React.useState(true);

  setTimeout(() => {
    setShow(false);
  }, 3000);

  return (
    <>
      {show && (
        <div className="toast toast-top">
          <div
            className={`alert alert-${status} flex justify-between items-center`}
          >
            <div>{message}</div>
            <button
              className="p-3 rounded-full transition-all duration-300 hover:bg-gray-300"
              onClick={() => setShow(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-[10px] w-[10px] "
              >
                <path
                  d="M11 0.7H13V23.3H11z"
                  transform="rotate(-45.001 12 12)"
                />
                <path
                  d="M0.7 11H23.3V13H0.7z"
                  transform="rotate(-45.001 12 12)"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
