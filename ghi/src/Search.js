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
            <div className="row">
                <div className="offset-3 col-6">
                  docker-c
                </div>
            </div>
            <div>
                <h1>Search Results</h1>
                {console.log(results)}
                {results.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Result</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{result.search_result}</td>
                                        <td>{result.table}</td>
                                    </tr>
                                );
                            })}
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
