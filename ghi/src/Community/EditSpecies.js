import React, { useEffect, useState } from "react";
import useToken from "../auth forms/newindex.tsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditSpecies({ user }) {
  const [name, setName] = useState("");
  const [location_type, setLocation] = useState("");
  const [cycle_type, setCycleType] = useState("");
  const [picture, setPicture] = useState("");
  const { token } = useToken();
  const { species_id } = useParams();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
  };
  const handleLifecycleChange = (e) => {
    const value = e.target.value;
    setCycleType(value);
  };
  const handlePictureChange = (e) => {
    const value = e.target.value;
    setPicture(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const species = {};
    species.name = name;
    species.picture = picture;
    species.location_type = location_type;
    species.cycle_type = cycle_type;
    species.user_id = user.id;

    const url = `${process.env.REACT_APP_API_HOST}/api/species/${species_id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(species),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setName(species.name);
      setPicture(species.picture);
      setLocation(species.location_type);
      setCycleType(species.cycle_type);
      navigate(`/species`);
    }
  };

  useEffect(() => {
    console.log("Fetching species data...");
    console.log("Token:", token);
    console.log("Species ID:", species_id);
    if (token) {
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/api/species/${species_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "get",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setPicture(data.picture);
          setLocation(data.location_type);
          setCycleType(data.cycle_type);
        }
      };
      fetchData();
    }
  }, [token, species_id]); // <-- Include species_id in the dependency array

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Edit species!</h1>
        <form onSubmit={handleSubmit} id="add-plant-form">
          <div className="form-floating mb-3">
            <input
              onChange={handleNameChange}
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
          <button className="btn btn-primary">Confirm!</button>
        </form>
      </div>
    </div>
  );
}

export default EditSpecies;
