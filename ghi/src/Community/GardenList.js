import React, { useEffect, useState } from "react";

function GardenList() {
  console.log("Hello!");
  const [gardens, setGardens] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const gardenUrl = `${process.env.REACT_APP_API_HOST}/api/garden`;
      try {
        const response = await fetch(gardenUrl);
        if (!response.ok) {
          throw new Error("API call failed.");
        }
        const data = await response.json();
        console.log("data.gardens=", data.gardens);
        setGardens(data.gardens);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Community Page</h1>
      {gardens && gardens.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Plant Uploader Name</th>
              <th>Plant Nickname</th>
              <th>Species Name</th>
            </tr>
          </thead>
          <tbody>
            {gardens.map((garden, index) => {
              return (
                <tr key={index}>
                  <td>{garden.username}</td>
                  <td>{garden.uploader_name}</td>
                  <td>{garden.plant_nickname}</td>
                  <td>{garden.species_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default GardenList;
