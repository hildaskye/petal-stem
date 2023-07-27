import React, { useEffect, useState } from "react";
import useToken from "../auth forms/newindex.tsx";

export default function PlantSpeciesForm() {
    const [name, setSpecies] = useState('');
    const [location_type, setLocation] = useState('');
    const [cycle_type, setLifecycle] = useState('');
    const [picture, setPicture] = useState('');
    const [user_id, setUser] = useState('');
    const { token } = useToken();

    const handleSpeciesChange = (e) => {setSpecies(e.target.value)};
    const handleLocationChange = (e) => {setLocation(e.target.value)};
    const handleLifecycleChange = (e) => {setLifecycle(e.target.value)};
    const handlePictureChange = (e) => {setPicture(e.target.value)};
    const handleUserChange = (e) => {setUser(e.target.value)};

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {};
      data.name = name;
      data.location_type = location_type;
      data.cycle_type = cycle_type;
      data.picture = picture;
      data.user_id = user_id;

      const speciesUrl = `${process.env.REACT_APP_API_HOST}/api/species`;
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await fetch(speciesUrl, fetchConfig);

      if (response.ok) {
        setSpecies('');
        setLocation('');
        setLifecycle('');
        setPicture('');
        setUser('');
      }
      }


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
              className="form-select form-select-sm"
              value={location_type}
              aria-label=".form-select-sm example"
            >
              <option defaultValue>Location of plant</option>
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

          <div className="form-floating mb-3">
            <input
              onChange={handleUserChange}
              value={user_id}
              placeholder="user id"
              required
              type="text"
              id="user_id"
              className="form-control"
            />
          </div>

          <button className="btn btn-primary">Create!</button>
        </form>
      </div>
    </div>
  );
}
