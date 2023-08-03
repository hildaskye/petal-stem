import React, { useEffect, useState } from "react";
import useToken from "../auth forms/newindex.tsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SpeciesList() {
  const [species, setSpecies] = useState([]);
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/api/species`;
      const fetchConfig = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setSpecies(data);
      }
    };
    fetchData();
  }, [token]);

  const handleDelete = async (speciesId) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/species/${speciesId}`;
    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setSpecies((prevSpecies) =>
        prevSpecies.filter((specie) => specie.id !== speciesId)
      );
    }
  };

  const handleEdit = (speciesId) => {
    navigate(`/species/${speciesId}/edit`);
  };

  return (
    <div>
      <div className="species-header">
        <h1 className="heading">Species</h1>
        <Link to={`/species/add`}>
          <button className="btn btn-outline-success">Add a new plant species!</button>
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {species.map((specie) => {
            return (
              <tr key={specie.id}>
                <td>{specie.name}</td>
                <td>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleEdit(specie.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(specie.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SpeciesList;
