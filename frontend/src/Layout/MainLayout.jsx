import React from "react";
import { Outlet } from "react-router-dom";
import NavBottom from "../Components/NavBottom";

const MainLayout = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* <header>Main Layout Header</header> */}
      <main className="w-full h-full flex items-center justify-center overflow-y-auto ">
        <Outlet />
      </main>
      <NavBottom />
    </div>
  );
};

export default MainLayout;
