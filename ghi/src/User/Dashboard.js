import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import useToken from "../auth forms/newindex.tsx";

export default function Dashboard() {
  const [plants, setPlants] = useState([]);
  const { user_id } = useParams();
  const { token } = useToken();

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


  return (
    <>
      <div>
        <h1>Your garden</h1>
        {console.log(plants)}
        {plants.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {plants.map((personal_plant) => {
                return (
                  <tr key={personal_plant.id}>
                    <td>{personal_plant.nickname}</td>
                    <td>{personal_plant.picture}</td>
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
