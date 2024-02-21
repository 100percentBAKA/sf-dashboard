import { Outlet } from "react-router-dom";

/*
 * Sidebar and the Navbar components will do inside the Root component
 * The MainArea of the dashboard will be displayed using the "Outlet"
 */

const Root = () => {
  return (
    <div>
      <div>This is the Root Page</div>
      <Outlet />
    </div>
  );
};

export default Root;
