import React from "react";
import { Routes, Route } from "react-router-dom";
import useToken from "./auth forms/newindex.tsx";
import {
  Navbar,
  MainPage,
  Login,
  SignUp,
  Logout,
  GardenList,
  PestDetail,
  PestForm,
  PestList,
  PlantSpeciesForm,
  SearchList,
  Dashboard,
  PlantDetail,
  PlantForm,
  SpeciesList,
  useUser,
  EditSpecies,
} from "./imports";
import "./App.css";


function App(props) {
  const { token } = useToken();
  const { user } = useUser(token);
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/gardens" element={<GardenList />} />
          <Route path="/pest/:pest_id" element={<PestDetail />} />
          <Route path="/pest/add" element={<PestForm />} />
          <Route path="/pest/list" element={<PestList />} />
          <Route path="/species/add" element={<PlantSpeciesForm />} />
          <Route path="/species" element={<SpeciesList />} />
          <Route path="/garden" element={<Dashboard />} />
          <Route path= "/garden/:user_id/plant" element={<PlantForm />} />
          <Route path="/garden/:user_id/plant/:plant_id" element={<PlantDetail />}/>
          <Route path ="/species/:species_id/edit" element={ <EditSpecies />}/>
          <Route path="/search" element={<SearchList />} />
        </Routes>
      </div>
      <script
        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossOrigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossOrigin="anonymous"
      />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" />
  </>
  );
}

export default App;
