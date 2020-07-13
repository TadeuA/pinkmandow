import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

//import pages
import Home from "./pages/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" />
    </BrowserRouter>
  );
};

export default Routes;
