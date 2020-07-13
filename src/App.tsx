import React from "react";

import "./App.css";

import Routes from "./routes";

import { ObjectsFormContextProvider } from "./components/ObjectsForm/context";
import { ItemsContextProvider } from "./components/ObjectsForm/itensContext";

function App() {
  return (
    <ObjectsFormContextProvider>
      <ItemsContextProvider>
        <Routes />
      </ItemsContextProvider>
    </ObjectsFormContextProvider>
  );
}

export default App;
