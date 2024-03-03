import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import sidebarCat from "../data/sidebarCat";
// import { useMemo } from "react";

const Navbar = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const breadcrumbs = useMemo(() => {
    const pathnames = pathname.split("/").filter((x) => x);
    const breadcrumbItems = pathnames.map((_, index, arr) => {
      const url = `/${arr.slice(0, index + 1).join("/")}`;
      const name = arr[index];
      return { name, url };
    });
    return breadcrumbItems;
  }, [pathname]);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-[#fff] rounded-[10px] shadow-md">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div className="flex-1 px-2 mx-2">
            {/* Bread Crumbs section */}
            <div className="flex-col">
              <div className="text-sm breadcrumbs">
                <ul>
                  {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index}>
                      <NavLink to={breadcrumb.url}>{breadcrumb.name}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-[18px] font-semibold">
                {breadcrumbs[breadcrumbs.length - 1].name
                  .charAt(0)
                  .toUpperCase() +
                  breadcrumbs[breadcrumbs.length - 1].name.slice(1)}
              </div>
            </div>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* //! add logout and user avatar here */}
              {/* Navbar menu content here */}
              <li>
                <button
                  className="shadow-lg btn btn-primary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-primary h-screen px-4 py-2 overflow-auto">
          <ul>
            {sidebarCat.map((category, index) => (
              <li key={index} className="my-6 rounded-md">
                <NavLink to={category.to}>
                  <button
                    className="w-full flex items-center gap-6 px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none hover:bg-secondary transition-all duration-150 ease-in-out"
                    onClick={() =>
                      setOpenCategory(openCategory === index ? null : index)
                    }
                  >
                    {category.icon}
                    {category.name}
                    {category.subcategories.length > 0 && (
                      <svg
                        className={`w-4 h-4 ${
                          openCategory === index ? "transform rotate-90" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            openCategory === index
                              ? "M5 15l7-7 7 7"
                              : "M19 9l-7 7-7-7"
                          }
                        />
                      </svg>
                    )}
                  </button>
                </NavLink>
                {openCategory === index &&
                  category.subcategories.length > 0 && (
                    <ul className="px-4">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <li
                          key={subIndex}
                          className="my-2 rounded-md px-2 py-1 hover:bg-secondary transition-all duration-150 ease-in-out cursor-pointer"
                        >
                          <NavLink
                            to={subcategory.to}
                            className="text-sm text-white"
                          >
                            {subcategory.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
