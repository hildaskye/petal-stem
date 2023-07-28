import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import useToken from "../auth forms/newindex.tsx";
import { useNavigate } from "react-router-dom";

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
        <h1>Your garden</h1>
        {plants.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Log</th>
              </tr>
            </thead>
            <tbody>
              {plants.map((personal_plant) => {
                return (
                  <tr key={personal_plant.id}>
                    <td>{personal_plant.nickname}</td>
                    <td>{personal_plant.log}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(personal_plant.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(personal_plant.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>You have no plants!</p>
        )}
      </div>
    </>
  );
}
