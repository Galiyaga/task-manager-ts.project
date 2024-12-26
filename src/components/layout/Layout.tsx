import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import React from "react";

export const Layout = React.memo(() => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
      </footer>
    </>
  );
});
