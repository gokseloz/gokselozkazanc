import React from "react";
import MainNavigation from "./MainNavigation";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = (props: ILayoutProps) => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
