import React from "react";

import "./App.css";
import OwlDemo from "./owldemo";

export default function MainPage({}) {
  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Petal & Stem</h1>
      </div>

      <div className="App">
        <OwlDemo />
      </div>
    </>
  );
}
