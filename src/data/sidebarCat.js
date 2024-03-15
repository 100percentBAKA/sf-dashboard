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
        to: "/app/categories",
        subcategories: [],
    },
    {
        name: "File Sub Category",
        icon: <FaFile />,
        to: "/app/sub-categories",
        subcategories: [],
    },
    {
        name: "File Sub to Sub Category",
        icon: <FaFile />,
        to: "/app/sub-sub-categories",
        subcategories: [],
    },
    {
        name: "Author",
        icon: <FaUser />,
        to: "/app/author",
        subcategories: []
    },
    {
        name: "File Upload",
        to: "/app/file-upload",
        icon: <FaPage4 />,
        subcategories: [],
    },
    {
        name: "Pdf Books",
        to: "/app/pdf-books",
        icon: <FaBook />,
        subcategories: [],
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