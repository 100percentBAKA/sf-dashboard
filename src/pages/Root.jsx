import { Outlet } from "react-router-dom";

/*
 * Sidebar and the Navbar components will do inside the Root component
 * The MainArea of the dashboard will be displayed using the "Outlet"
 */

const Root = () => {
  return (
    <div className="w-screen h-screen flex">
      {/* fixed sidebar */}
      <div className="hidden lg:flex lg:h-[100%] lg:w-[300px] xl:w-[330px] bg-green-500">
        Sidebar
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col bg-red-500 p-6">
        {/* fixed navbar */}
        <nav className="mb-14 p-4 bg-yellow-500">Navbar</nav>

        {/* main working area */}
        <main className="bg-blue-500 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
