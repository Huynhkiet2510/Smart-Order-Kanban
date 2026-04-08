import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/NavbarCustomer";
import Footer from "../Footer/Footer";

const LayoutCustomer = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <header>
        <Navbar />
      </header>

      <main className="flex-1 px-4 py-4">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
      
    </div>
  );
};

export default LayoutCustomer;