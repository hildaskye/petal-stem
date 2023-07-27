import React, { useEffect, useState } from "react";
import useToken from "../auth forms/newindex.tsx";

export default function PestForm() {
    const [name, setPest] = useState('');
    const [picture, setPicture] = useState('');
    const [log, setLog] = useState('');
    const [user_id, setUser] = useState('');
    const { token } = useToken();

    const handlePestChange = (e) => {setPest(e.target.value)};
    const handlePictureChange = (e) => {setPicture(e.target.value)};
    const handleLogChange = (e) => {setLog(e.target.value)};
    const handleUserChange = (e) => {setUser(e.target.value)};

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {};
      data.name = name;
      data.picture = picture;
      data.log = log;
      data.user_id = user_id;

      const pestUrl = `${process.env.REACT_APP_API_HOST}/api/pest`;
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await fetch(pestUrl, fetchConfig);

      if (response.ok) {
        setPest('');
        setPicture('');
        setLog('');
        setUser('');
      }
      }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Add a new type of pest!</h1>
        <form onSubmit={handleSubmit} id="add-pest-form">
          <div className="form-floating mb-3">
            <input
              onChange={handlePestChange}
              value={name}
              placeholder="Pest name"
              required
              type="text"
              id="name"
              className="form-control"
            />
          </div>

          <div className="form-floating mb-3">
            <input
              onChange={handlePictureChange}
              value={picture}
              placeholder="Add a pest picture url here!"
              required
              type="text"
              id="picture"
              className="form-control"
            />
          </div>

          <div className="form-floating mb-3">
            <input
              onChange={handleLogChange}
              value={log}
              placeholder="Add some log about the pest here!"
              required
              type="text"
              id="log"
              className="form-control"
            />
          </div>

          <div className="form-floating mb-3">
            <input
              onChange={handleUserChange}
              value={user_id}
              placeholder="user id"
              required
              type="text"
              id="user_id"
              className="form-control"
            />
          </div>

          <button className="btn btn-primary">Create!</button>
        </form>
      </div>
    </div>
  );
}
