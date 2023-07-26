import React, { useEffect, useState } from "react";

export default function PlantSpeciesForm() {
    const [name, setSpecies] = useState('');
    const [location_type, setLocation] = useState("");
    const [cycle_type, setLifecycle] = useState("");
    const [picture, setPicture] = useState('');
    const [user, setUser] = useState("");

    const handleSpeciesChange = (e) => {
      const value = e.target.value;
      setSpecies(value);
    };
    const handleLocationChange = (e) => {
      const value = e.target.value;
      setLocation(value);
    };
    const handleLifecycleChange = (e) => {
      const value = e.target.value;
      setLifecycle(value);
    };
    const handlePictureChange = (e) => {
      const value = e.target.value;
      setPicture(value);
    };
    const handleUserChange = (e) => {
      const value = e.target.value;
      setUser(value);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {};
      data.name = name;

      const speciesUrl = `${process.env.REACT_APP_API_HOST}/api/species`;
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(speciesUrl, fetchConfig);
      if (response.ok) {
        const newSpecies = await response.json();
        setSpecies("");
      }
    };


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Add a new type of plant!</h1>
        <form onSubmit={handleSubmit} id="add-plant-form">
          <div className="form-floating mb-3">
            <input
              onChange={handleSpeciesChange}
              value={name}
              placeholder="Common name"
              required
              type="text"
              id="species"
              className="form-control"
            />
          </div>

          <div className="form-floating mb-3">
            <select
              required
              onChange={handleLocationChange}
              name="location"
              id="location"
              className="form-select form-select-sm"
              value={location_type}
              aria-label=".form-select-sm example"
            >
              <option selected>Location of plant</option>
              <option value="Indoor">Indoors</option>
              <option value="Outdoor">Outdoors</option>
            </select>
          </div>

          <div className="form-floating mb-3">
            <select
              required
              onChange={handleLifecycleChange}
              name="lifecycle"
              id="lifecycle"
              className="form-select form-select-sm"
              value={cycle_type}
              aria-label=".form-select-sm example"
            >
              <option selected>Lifecycle</option>
              <option value="Annual">Annual</option>
              <option value="Biennial">Biennial</option>
              <option value="Perennial">Perennial</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-floating mb-3">
            <input
              onChange={handlePictureChange}
              value={picture}
              placeholder="Upload a picture of the plant here!"
              required
              type="text"
              id="picture"
              className="form-control"
            />
          </div>

          <div className="form-floating mb-3">
            <input
              onChange={handleUserChange}
              value={user}
              placeholder="user id"
              required
              type="text"
              id="user"
              className="form-control"
            />
          </div>

          <button className="btn btn-primary">Create!</button>
        </form>
      </div>
    </div>
  );
}
