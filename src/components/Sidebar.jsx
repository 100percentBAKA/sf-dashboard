import { useState } from "react";
import { NavLink } from "react-router-dom";
import sidebarCat from "../data/sidebarCat";

const Sidebar = () => {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="w-full bg-primary h-screen p-2 overflow-auto">
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
            {openCategory === index && category.subcategories.length > 0 && (
              <ul className="px-4">
                {category.subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex}>
                    <NavLink to={subcategory.to} className="text-sm text-white">
                      <button className="w-full my-2 rounded-md px-2 py-1 hover:bg-secondary transition-all duration-150 ease-in-out cursor-pointer text-left">
                        {subcategory.name}
                      </button>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

// active:bg-[#ffffff33] focus:bg-[#ffffff33]
