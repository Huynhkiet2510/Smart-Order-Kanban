import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const LayoutAdmin = () => {
  return (

    <div className="flex h-screen overflow-hidden">
      <div className="w-64 fixed left-0 top-0 h-full">
        <Sidebar />
      </div>

      <main className="ml-64 flex-1 flex flex-col bg-gray-100 h-full">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LayoutAdmin;