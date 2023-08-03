import React, { useEffect, useState } from "react";
import useToken from "../auth forms/newindex.tsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PestEdit({ user }) {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [log, setPestLog] = useState("");
  const { token } = useToken();
  const { pest_id } = useParams();
  const navigate = useNavigate();

  const handlePestNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePictureChange = (e) => {
    setPicture(e.target.value);
  };
  const handleLogChange = (e) => {
    setPestLog(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.name = name;
    data.picture = picture;
    data.log = log;
    data.pest_id = parseInt(pest_id);
    data.user_id = parseInt(user.id);
    console.log("PUT data:", data);

    const pestUrl = `${process.env.REACT_APP_API_HOST}/api/pest/${pest_id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(pestUrl, fetchConfig);
    if (response.ok) {
      setName("");
      setPicture("");
      setPestLog("");
      navigate(`/pest/${pest_id}/`);
    }
  };

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/api/pest/${pest_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "get",
          }
        );
        if (response.ok) {
          const receivedData = await response.json();
          const data = receivedData[0];
          setName(data.name);
          setPicture(data.picture);
          setPestLog(data.log);
        }
      };
      fetchData();
    }
  }, [token, pest_id]);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1 className="heading">Edit pest!</h1>
        <form onSubmit={handleSubmit} id="add-plant-form">
          <div className="form-floating mb-3">
            <input
              onChange={handlePestNameChange}
              value={name}
              placeholder="What is the pest's name?"
              required
              type="text"
              id="nickname"
              className="form-control"
            />
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handlePictureChange}
              value={picture}
              placeholder="Picture URL"
              required
              type="text"
              id="nickname"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="log">Description</label>
            <textarea
              onChange={handleLogChange}
              value={log}
              id="log"
              rows="3"
              name="log"
              className="form-control"
            ></textarea>
          </div>
          <button className="btn button-update">Update</button>
        </form>
      </div>
    </div>
  );
}
