import React, { useState } from "react";
import useToken from "../auth forms/newindex.tsx";
import { useNavigate } from "react-router-dom";

export default function PlantSpeciesForm({ user }) {
  const [name, setSpecies] = useState("");
  const [location_type, setLocation] = useState("");
  const [cycle_type, setLifecycle] = useState("");
  const [picture, setPicture] = useState("");
  const { token } = useToken();
  const navigate = useNavigate();

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleLifecycleChange = (e) => {
    setLifecycle(e.target.value);
  };
  const handlePictureChange = (e) => {
    setPicture(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.name = name;
    data.location_type = location_type;
    data.cycle_type = cycle_type;
    data.picture = picture;
    data.user_id = user.id;

    const speciesUrl = `${process.env.REACT_APP_API_HOST}/api/species`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(speciesUrl, fetchConfig);

    if (response.ok) {
      setSpecies("");
      setLocation("");
      setLifecycle("");
      setPicture("");
      navigate(`/species`);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1 className="heading">Add a new plant species!</h1>
        <form onSubmit={handleSubmit} id="add-plant-form">
          <div className="form-floating mb-3">
            <input
              onChange={handleSpeciesChange}
              value={name}
              placeholder="Common name"
              required
              type="text"
              id="name"
              className="form-control"
            />
          </div>

          <div className="form-floating mb-3">
            <select
              required
              onChange={handleLocationChange}
              name="location"
              id="location"
              className="select-species"
              value={location_type}
              aria-label=".form-select-sm example"
            >
              <option defaultValue>Location of plant</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>

          <div className="form-floating mb-3">
            <select
              required
              onChange={handleLifecycleChange}
              name="lifecycle"
              id="lifecycle"
              className="select-species"
              value={cycle_type}
              aria-label=".form-select-sm example"
            >
              <option defaultValue>Lifecycle</option>
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

          <button className="btn button-update">Create!</button>
        </form>
      </div>
    </div>
  );
}
