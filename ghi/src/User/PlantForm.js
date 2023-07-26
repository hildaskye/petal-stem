import React, { useEffect, useState } from "react";
import useToken from "../auth forms/newindex.tsx";

export default function PlantForm() {
    const [name, setSpeciesList] = useState([]);
    const [nickname, setPlantNickname] = useState('');
    const [log, setPlantLog] = useState('');
    const [species, setSpecies] = useState('');
    const [user_id, setUser] = useState('');
    const { token } = useToken();

    const handlePlantNicknameChange = (e) => {setPlantNickname(e.target.value)};
    const handlePlantLogChange = (e) => {setPlantLog(e.target.value)};
    const handleSpeciesChange = (e) => {setSpecies(e.target.value)};
    const handleUserChange = (e) => {setUser(e.target.value)};

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {};
      data.nickname = nickname;
      data.log = log;
      data.species = species;
      data.user_id = user_id;

      const gardenUrl = `${process.env.REACT_APP_API_HOST}/api/garden`;
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await fetch(gardenUrl, fetchConfig);
      if (response.ok) {
        setPlantNickname('');
        setPlantLog('');
        setSpecies('');
        setUser('');
      }
      }

    useEffect(() => {
      const fetchData = async () => {
        const speciesUrl = `${process.env.REACT_APP_API_HOST}/api/species`;
        const getConfig = {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(speciesUrl, getConfig);
        if (response.ok) {
          const data = await response.json();
          setSpeciesList(data.name);
        }
      };

      fetchData();
    }, [token]);


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Add a plant!</h1>
        <form onSubmit={handleSubmit} id="add-plant-form">
          <div className="form-select form-select-sm">
            <select
              required
              onChange={handleSpeciesChange}
              name="name"
              id="species_id"
              className="form-select"
              value={name}
            >
              <option value="">Type of plant</option>
              {name.map((species) => {
                return (
                  <option key={species.id} value={species.id}>
                    {species.id}
                  </option>
                );
              })}
            </select>
          </div>
          <div>Plant not listed? Click here!</div>

          <div className="form-floating mb-3">
            <input
              onChange={handlePlantNicknameChange}
              value={nickname}
              placeholder="What do you want to call this plant?"
              required
              type="text"
              id="nickname"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="log">Description</label>
            <textarea
              onChange={handlePlantLogChange}
              className="form-control"
              id="log"
              rows="3"
              name="log"
              className="form-control"
            ></textarea>
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
