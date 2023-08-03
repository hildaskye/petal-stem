import React, { useState } from 'react';
import useToken from "./auth forms/newindex.tsx";

function SearchList() {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);
    const { token } = useToken();

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        const url = `${process.env.REACT_APP_API_HOST}/api/search/${term}`;
        const fetchConfig = {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            setResults(data);
            setTerm('');
        }
    };

    return (
      <>
        <div>
          <div className="col-md-4 offset-md-8">
            <div className="shadow p-2 mt-4 d-flex">
              <form
                onSubmit={handleSearchSubmit}
                id="create-search"
                className="w-100"
              >
                <div className="input-group mb-3">
                  <input
                    onChange={handleTermChange}
                    placeholder="Search"
                    required
                    type="text"
                    className="form-control"
                    value={term}
                  />
                  <div className="search-button">
                    <button className="btn btn-success" type="submit">
                      Search!
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <h1 className="search-heading">Search Results</h1>

          {results.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Result</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{result.search_result}</td>
                    <td>{result.table}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </>
    );
}

export default SearchList;
