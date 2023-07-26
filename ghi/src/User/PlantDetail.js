import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useToken from "../auth forms/newindex.tsx";

function PlantDetail(props) {
    const [plant, setPlant] = useState(null);
    const { user_id, plant_id } = useParams();
    const { token } = useToken();

    useEffect(() => {
        const getData = async () => {
            const plantUrl = `${process.env.REACT_APP_API_HOST}/api/garden/${user_id}/plant/${plant_id}`;
            const fetchConfig = {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
        const response = await fetch(plantUrl, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            setPlant(data[0]);
            console.log("data=", data)
        }
    };
    getData();
    }, [token, user_id, plant_id]);

    if (plant === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Plant Details</h1>
            <table className="table table-striped">
            <thead>
                <tr>
                <th>Plant Nickname</th>
                <th>Plant Log</th>
                <th>User</th>
                <th>Species</th>
                <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{plant.nickname}</td>
                    <td>{plant.log}</td>
                    <td>{plant.user_id}</td>
                    <td>{plant.species_id}</td>
                    <td>{plant.picture}</td>
                </tr>
            </tbody>
            </table>
        </div>
    );
}

export default PlantDetail;
