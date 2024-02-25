import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

/*
 * Sidebar and the Navbar components will do inside the Root component
 * The MainArea of the dashboard will be displayed using the "Outlet"
 */

const Root = () => {
  return (
    <div className="w-screen h-screen flex">
      {/* Fixed sidebar */}
      <div className="h-full fixed left-0 top-0 bg-green-500 w-[250px] xl:w-[330px]">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex-1 ml-[250px] xl:ml-[330px] p-6">
        <Navbar />

        {/* Main working area */}
        <main className="flex-1 bg-blue-300 mt-10 rounded-[10px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
