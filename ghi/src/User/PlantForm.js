import React, { useEffect, useState } from "react";

export default function PlantForm() {
    const [plants, setPlants] = useState([]);
    const [species, setSpecies] = useState('');
    const [plantNickname, setPlantNickname] = useState("");
    const [plantLog, setPlantLog] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("${process.env.REACT_APP_API_HOST}/api/species");
            const data = await response.json();
            setSpecies(data.species);
        };

    fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            species,
            plantNickname,
            plantLog
        };

    const gardenUrl = "${process.env.REACT_APP_API_HOST}/api/garden";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            "Content-Type": "application/json",
            },
        };
    const response = await fetch(gardenUrl, fetchConfig);

    if (response.ok) {
        setSpecies('');
        setPlantNickname('');
        setPlantLog('');
    }
    };

    const handleSpeciesChange = (e) => {
      const value = e.target.value;
      setSpecies(value);
    };
    const handlePlantNicknameChange = (e) => {
      const value = e.target.value;
      setPlantNickname(value);
    };
    const handlePlantLogChange = (e) => {
        const value = e.target.value;
        setPlantLog(value);
    };


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Add a plant!</h1>
        <form onSubmit={handleSubmit} id="add-plant-form">

          <div className="form-select form-select-sm">
            <select
              required
              onChange={handleSpeciesChange}
              name="species"
              id="species"
              className="form-select"
              value={species}
            >
              <option value="">Type of plant</option>
              {/* {species.map((species) => {
                return (
                  <option key={species.id} value={species.id}>
                    {species.name}
                  </option> */}
                );
              })}
            </select>
          </div>
          <div>Plant not listed? Click here!</div>
          <div className="form-floating mb-3">
            <input
              onChange={handlePlantNicknameChange}
              value={plantNickname}
              placeholder="What do you want to call this plant?"
              required
              type="text"
              id="plantNickname"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="plantLog">Description</label>
            <textarea
              onChange={handlePlantLogChange}
              className="form-control"
              id="plantLog"
              rows="3"
              name="plantLog"
              className="form-control"
            ></textarea>
          </div>
          <button className="btn btn-primary">Create!</button>
        </form>
      </div>
    </div>
  );
}
