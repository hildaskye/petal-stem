import React, { useEffect, useState } from 'react';
import useToken from "../auth forms/newindex.tsx";

function SpeciesList() {
    const [species, setSpecies] = useState([]);
    const { token } = useToken();

    useEffect(() => {
        const fetchData = async () => {
            const url = `${process.env.REACT_APP_API_HOST}/api/species`
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
                setSpecies(data);
            }
        }
        fetchData();
    }, [token]);

    return (
        <div>
            <h1>Species</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {species.map(specie => {
                        return (
                            <tr key={specie.id}>
                                <td>{ specie.name }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SpeciesList;
