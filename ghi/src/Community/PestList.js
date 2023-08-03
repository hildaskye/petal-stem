import React, { useEffect, useState } from "react";
import useToken from "../auth forms/newindex.tsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function PestList() {
  const [pest, setPest] = useState([]);
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/api/pest`;
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
        setPest(data);
      }
    };
    fetchData();
  }, [token]);

  const handleDelete = async (pestId) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/pest/${pestId}`;
    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setPest((prevPest) =>
        prevPest.filter((pest) => pest.id !== pestId)
      );
    }
  };

  const handleEdit = (pestId) => {
    navigate(`/pest/${pestId}/edit`);
  };

  return (
    <div>
      <div className="species-header">
        <h1 className="heading">Pest</h1>
        <Link to={`/pest/add`}>
          <button className="btn btn-outline-success">Add a new pest!</button>
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
          {pest.map((pestunit) => {
            return (
              <tr key={pestunit.id}>
                <td>{pestunit.name}</td>
                <td className="text-end">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => handleEdit(pestunit.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(pestunit.id)}
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

export default PestList;
