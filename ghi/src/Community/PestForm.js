import React, { useEffect, useState } from "react";

export default function PestForm() {
  const [pest, setPest] = useState('');
  const [pestInfo, setPestInfo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("${process.env.REACT_APP_API_HOST}/api/pest");
      const data = await response.json();
      setPest(data.pest);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      pest,
      pestInfo,
    };

    const plantUrl = "${process.env.REACT_APP_API_HOST}/api/pest/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(plantUrl, fetchConfig);

    if (response.ok) {
      setPest("");
      setPestInfo("");
    }
  };

  const handlePestChange = (e) => {
    const value = e.target.value;
    setPest(value);
  };
  const handlePestInfoChange = (e) => {
    const value = e.target.value;
    setPestInfo(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Add a pest!</h1>
        <form onSubmit={handleSubmit} id="add-pest-form">
          <div className="form-floating mb-3">
            <input
              onChange={handlePestChange}
              value={pest}
              placeholder="Name of pest"
              required
              type="text"
              id="pest"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pestInfo">Description</label>
            <textarea
              onChange={handlePestInfoChange}
              className="form-control"
              id="pestInfo"
              rows="3"
              name="pestInfo"
              className="form-control"
            ></textarea>
          </div>
          <button className="btn btn-primary">Create!</button>
        </form>
      </div>
    </div>
  );
}
