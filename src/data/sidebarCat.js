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
        name: "Category",
        icon: <FaFile />,
        to: "/app/categories",
        subcategories: [],
    },
    {
        name: "Book",
        to: "/app/book",
        icon: <FaBook />,
        subcategories: [],
    },
    {
        name: "Book Upload",
        to: "/app/book-upload",
        icon: <FaPage4 />,
        subcategories: [],
    },
    {
        name: "Author",
        icon: <FaUser />,
        to: "/app/author",
        subcategories: []
    },
    {
        name: "Publications",
        to: "/app/pub",
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
                to: "/app/book-sales",
            },
            {
                name: "PDF Sales",
                icon: <FaFile />,
                to: "/app/pdf-sales",
            },
        ],
    },
    {
        name: "Gallery",
        to: "/app/gallery",
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
        to: "/app/reports",
        icon: <FaBookOpen />,
        subcategories: [],
    },
    {
        name: "Logout",
        to: "/",
        icon: <FaUser />,
        subcategories: [],
    },
];

export default sidebarCat 