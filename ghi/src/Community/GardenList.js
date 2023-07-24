import React, { useEffect, useState } from 'react';

function GardenList() {
  const [gardens, setGardens] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const gardenUrl = `${process.env.REACT_APP_API_HOST}/api/garden`;
      const response = await fetch(gardenUrl);
      if (response.ok) {
        const data = await response.json();
        setGardens(data);
      }
    };
    getData();
  }, []);

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
      <h1>Community Page</h1>
      {Object.keys(groupByUploaderName).length > 0 ? (
        Object.entries(groupByUploaderName).map(([uploaderName, userGardens]) => (
          <div key={uploaderName}>
            <h2>{uploaderName}'s Plants</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Plant Nickname</th>
                  <th>Species Name</th>
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
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default GardenList;
