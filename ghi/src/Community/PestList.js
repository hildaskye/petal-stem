import React, { useEffect, useState } from "react";
import useToken from "../auth forms/newindex.tsx";
import { useNavigate } from "react-router-dom";

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
      <h1>Pest</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {console.log(pest)}
          {pest.map((pestunit) => {
            return (
              <tr key={pestunit.id}>
                <td>{pestunit.name}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(pestunit.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(pestunit.id)}
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
