import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBook,
  FaBookOpen,
  FaDollarSign,
  FaFile,
  FaFileExcel,
  FaHome,
  FaImage,
  FaPage4,
  FaPagelines,
  FaUser,
} from "react-icons/fa";

const categories = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    to: "",
    subcategories: [],
  },
  {
    name: "File Category",
    icon: <FaFile />,
    subcategories: [
      {
        name: "sub1",
        icon: <FaFile />,
        to: "",
      },
      {
        name: "sub2",
        icon: <FaFile />,
        to: "",
      },
      {
        name: "sub3",
        icon: <FaFile />,
        to: "",
      },
    ],
  },
  {
    name: "File Upload",
    to: "",
    icon: <FaPage4 />,
    subcategories: [],
  },
  {
    name: "Pdf Books",
    to: "",
    icon: <FaBook />,
    subcategories: [],
  },
  {
    name: "Publications",
    to: "",
    icon: <FaPagelines />,
    subcategories: [],
  },
  {
    name: "Sales",
    to: "",
    icon: <FaDollarSign />,
    subcategories: [],
  },
  {
    name: "Gallery",
    to: "",
    icon: <FaImage />,
    subcategories: [],
  },
  {
    name: "Excel File Upload",
    to: "",
    icon: <FaFileExcel />,
    subcategories: [],
  },
  {
    name: "Reports",
    to: "",
    icon: <FaBookOpen />,
    subcategories: [],
  },
  {
    name: "Logout",
    to: "",
    icon: <FaUser />,
    subcategories: [],
  },
];

const Sidebar = () => {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="w-full bg-primary h-screen p-2 overflow-auto">
      <ul>
        {categories.map((category, index) => (
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
                  <li
                    key={subIndex}
                    className="my-2 rounded-md px-2 py-1 hover:bg-secondary transition-all duration-150 ease-in-out cursor-pointer"
                  >
                    <NavLink to={subcategory.to} className="text-sm text-white">
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
  );
};

export default Sidebar;
