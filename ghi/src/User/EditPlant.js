import React, { useEffect, useState } from "react";
import useToken from "../auth forms/newindex.tsx";
import { useParams } from "react-router-dom";

export default function PlantEdit() {
  const [nickname, setPlantNickname] = useState("");
  const [log, setPlantLog] = useState("");
  const [species, setSpecies] = useState("");
  const { token } = useToken();
  const { user_id, plant_id } = useParams();

  const handlePlantNicknameChange = (e) => {
    setPlantNickname(e.target.value);
  };
  const handlePlantLogChange = (e) => {
    setPlantLog(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.nickname = nickname;
    data.log = log;
    data.plant_id = parseInt(plant_id);
    data.user_id = parseInt(user_id);
    data.species_id = parseInt(species);
    console.log("PUT data:", data)

    const gardenUrl = `${process.env.REACT_APP_API_HOST}/api/garden/${user_id}/plant/${plant_id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(gardenUrl, fetchConfig);
    if (response.ok) {
      setPlantNickname("");
      setPlantLog("");
      setSpecies("");
      console.log("PUT worked successfully!")
    }
  };

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/api/garden/${user_id}/plant/${plant_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "get",
          }
        );
        if (response.ok) {
          const receivedData = await response.json();
          const data = receivedData[0];
          setPlantNickname(data.nickname);
          setPlantLog(data.log);
          setSpecies(data.species_id);
        }
      };
      fetchData();
    }
  }, [token, plant_id]);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Edit plant!</h1>
        <form onSubmit={handleSubmit} id="add-plant-form">
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
          {/* Add a hidden input field to store the species_id */}
          <input type="hidden" name="species_id" value={species} />
          <button className="btn btn-primary">Confirm!</button>
        </form>
      </div>
    </div>
  );
}
