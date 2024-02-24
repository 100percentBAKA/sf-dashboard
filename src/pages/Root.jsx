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
      {/* fixed sidebar */}
      <div className="hidden lg:flex lg:h-[100%] lg:w-[250px] xl:w-[330px] bg-green-500">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col p-6">
        <Navbar />

        {/* main working area */}
        <main className="bg-blue-500 h-full mt-10 rounded-[10px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
