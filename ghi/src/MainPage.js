import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MainPage({ conferences }) {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Petal & Stem</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          (carousel of plant pictures)
        </p>
      </div>
    </div>
  );
}
