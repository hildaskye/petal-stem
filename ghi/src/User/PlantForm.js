import React, { useEffect, useState } from "react";
import useToken from "../auth forms/newindex.tsx";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function PlantForm() {
    const [species, setSpeciesList] = useState([]);
    const [nickname, setPlantNickname] = useState('');
    const [log, setPlantLog] = useState('');
    const [species_id, setSpecies] = useState('');
    const { token } = useToken();
    const { user_id } = useParams();
    const navigate = useNavigate();

    const handlePlantNicknameChange = (e) => {setPlantNickname(e.target.value)};
    const handlePlantLogChange = (e) => {setPlantLog(e.target.value)};
    const handleSpeciesChange = (e) => {setSpecies(e.target.value)};

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {};
      data.nickname = nickname;
      data.log = log;
      data.species_id = parseInt(species_id);
      data.user_id = user_id;

      const gardenUrl = `${process.env.REACT_APP_API_HOST}/api/garden/${user_id}/plant`;
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(gardenUrl, fetchConfig);
      if (response.ok) {
        setPlantNickname('');
        setPlantLog('');
        setSpecies('');
        navigate(`/garden/${user_id}`);
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
          setSpeciesList(data);
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
              name="species_id"
              id="species_id"
              className="form-select"
              value={species_id}
            >
              <option value="">Type of plant</option>
              {species.map((species) => {
                return (
                  <option key={species.id} value={species.id}>
                    {species.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <Link to={`/species/add`}> Species not listed? Click here!</Link>
          </div>
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
              value={log}
              id="log"
              rows="3"
              name="log"
              className="form-control"
            ></textarea>
          </div>

          <button className="btn btn-primary">Create!</button>
        </form>
      </div>
    </div>
  );
}
