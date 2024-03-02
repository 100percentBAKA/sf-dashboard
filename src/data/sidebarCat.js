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

const sidebarCat = [
    {
        name: "Dashboard",
        icon: <FaHome />,
        to: "/app/dashboard",
        subcategories: [],
    },
    {
        name: "File Category",
        icon: <FaFile />,
        to: "",
        subcategories: [],
    },
    {
        name: "File Sub Category",
        icon: <FaFile />,
        to: "",
        subcategories: [],
    },
    {
        name: "File Sub to Sub Category",
        icon: <FaFile />,
        to: "",
        subcategories: [],
    },
    {
        name: "File Upload",
        to: "/app/file-upload",
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
        subcategories: [
            {
                name: "Book Sales",
                icon: <FaFile />,
                to: "",
            },
            {
                name: "PDF Sales",
                icon: <FaFile />,
                to: "",
            },
        ],
    },
    {
        name: "Gallery",
        to: "",
        icon: <FaImage />,
        subcategories: [],
    },
    {
        name: "Excel File Upload",
        to: "/app/excel-upload",
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

export default sidebarCat 