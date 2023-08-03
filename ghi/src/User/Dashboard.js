import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useToken from "../auth forms/newindex.tsx";

export default function Dashboard() {
  const [plants, setPlants] = useState([]);
  const { user_id } = useParams();
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData () {
      const gardenUrl = `${process.env.REACT_APP_API_HOST}/api/garden/${user_id}`;

      const fetchConfig = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(gardenUrl, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setPlants(data);
      }
    };
    getData();
  }, [user_id, token]);

  const handleDelete = async (plantId) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/garden/${user_id}/plant/${plantId}`;
    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setPlants((prevPlant) =>
        prevPlant.filter((plant) => plant.id !== plantId)
      );
    }
  };

  const handleEdit = (plantId) => {
    navigate(`/garden/${user_id}/plant/${plantId}/edit`);
  };


return (
  <>
    <div>
      <div className="dashboard-header">
        <h1 className="heading">Your Garden</h1>
        <Link to={`/garden/${user_id}/plant/add`}>
          <button className="btn btn-outline-success">Add a plant!</button>
        </Link>
      </div>
      <div className="card-container">
        {plants.length > 0 ? (
          plants.map((personal_plant) => (
            <div
              className="card"
              style={{ width: "18rem" }}
              key={personal_plant.id}
            >
              {/* <img src={personal_plant.picture} className="card-img-top" alt="picture" /> */}
              <div className="card-body">
                <h5 className="card-title">{personal_plant.nickname}</h5>
                <p className="card-text">{personal_plant.log}</p>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleEdit(personal_plant.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(personal_plant.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>You have no plants!</p>
        )}
      </div>
    </div>
  </>
);
}
