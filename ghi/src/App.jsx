import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import Construct from "./Construct.js";
import Test from "./test.js"
import ErrorNotification from "./ErrorNotification.js";
import "./App.css";

import Navbar from "./Navbar.js";
import MainPage from "./MainPage.js";
import Login from "./auth forms/Login.jsx";
import SignUp from "./auth forms/SignUp.jsx";
// community
import GardenList from "./Community/GardenList.js";
import PestDetail from "./Community/PestDetail.js";
import PestForm from "./Community/PestForm.js";
import PestList from "./Community/PestList.js";
import PlantSpeciesForm from "./Community/PlantSpeciesForm.js";
// user logged in
import Dashboard from "./User/Dashboard.js";
import PlantDetail from "./User/PlantDetail.js";
import PlantForm from "./User/PlantForm.js";

function App() {
//   // (Commented out code is old code for launch page, currently left for reference.
//   // Be sure to delete before project is finished)

//   const [launchInfo, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
//       console.log("fastapi url: ", url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, []);
//   return (
//     <div>
//       <ErrorNotification error={error} />
//       <Construct info={launchInfo} />
//     </div>
//   );
// }

// export default App;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous"
      ></link>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="gardens" element={<GardenList />} />
          <Route path="pest/${pest_id}/" element={<PestDetail />} />
          <Route path="pest" element={<PestForm />} />
          {/* fix these "pest" path labels!!~ */}
          <Route path="pest" element={<PestList />} />
          <Route path="species" element={<PlantSpeciesForm />} />
          <Route path="garden" element={<Dashboard />} />
          <Route path="garden/${user_id}/plant" element={<PlantForm />} />
          <Route
            path="garden/${user_id}/plant/${plant_id}"
            element={<PlantDetail />}
          />
        </Routes>
      </div>
      <p>This shows app.js is loading</p>
      <script
        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"
      ></script>
    </>
  );


}

export default App;
