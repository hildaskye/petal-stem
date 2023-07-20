import React, { useEffect, useState } from "react";

export default function PlantForm() {
    const [plants, setPlants] = useState([]);
    const [plant, setPlant] = useState('');
    const [plantLog, setPlantLog] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("${process.env.REACT_APP_API_HOST}/api/species");
            const data = await response.json();
            setPlants(data.plants);
        };

    fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            plant,
            plantLog
        };

    const plantUrl = "${process.env.REACT_APP_API_HOST}/api/garden/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            "Content-Type": "application/json",
            },
        };
    const response = await fetch(plantUrl, fetchConfig);

    if (response.ok) {
        setPlant('');
        setPlantLog('');
    }
    };


    const handlePlantChange = (e) => {
        const value = e.target.value;
        setPlant(value);
    }
    const handlePlantLogChange = (e) => {
        const value = e.target.value;
        setPlantLog(value);
    };


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Add a plant!</h1>
        <form onSubmit={handleSubmit} id="add-plant-form">

          Type of plant (dropdown here)

          {/* <div className="form-floating mb-3">
            <select required onChange={handlePlantChange} name="plant" id="plant" className="form-select" value={plant} >
                <option value="">Type of plant</option>
                {plants.map(plant => {
                    return (
                      <option key={plant.id} value={plant.id}>
                        {plant.name}
                      </option>
                    );
                    })}
            </select>
          </div> */}

          <div>Plant not listed? Click here!</div>

          <div className="form-floating mb-3">
            <input
              onChange={handlePlantChange}
              value={plant}
              placeholder="What do you want to call this plant?"
              required
              type="text"
              id="plant"
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
