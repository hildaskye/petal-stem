import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import useToken from "../auth forms/newindex.tsx";

function GardenList({ user_id }) {
  const [gardens, setGardens] = useState([]);
  const { token } = useToken();

  useEffect(() => {
    const getData = async () => {
      const gardenUrl = `${process.env.REACT_APP_API_HOST}/api/garden`;
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
        setGardens(data);
      }
    };
    getData();
  }, [token]);

  const groupByUploaderName = {};

  gardens.forEach((garden) => {
    const uploaderName = garden.uploader_name;
    if (!groupByUploaderName[uploaderName]) {
      groupByUploaderName[uploaderName] = [];
    }
    groupByUploaderName[uploaderName].push(garden);
  });

  return (
    <div>
      <h1 className="heading">Community</h1>
      {Object.keys(groupByUploaderName).length > 0 ? (
        Object.entries(groupByUploaderName).map(
          ([uploaderName, userGardens]) => (
            <div key={uploaderName}>
              <h2>{uploaderName}'s Garden</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Plant Name</th>
                    <th>Species</th>
                  </tr>
                </thead>
                <tbody>
                  {userGardens.map((garden) => (
                    <tr key={garden.id}>
                      <td>{garden.plant_nickname}</td>
                      <td>{garden.species_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default GardenList;
