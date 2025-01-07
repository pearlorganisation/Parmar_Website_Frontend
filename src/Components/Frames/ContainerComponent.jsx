import React, { Fragment } from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { Outlet } from "react-router-dom";

const ContainerComponent = () => {
  return (
    <Fragment>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </Fragment>
  );
};

export default ContainerComponent;
