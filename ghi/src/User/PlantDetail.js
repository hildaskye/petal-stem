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

    const handleDelete = async () => {
        try {
            const deleteUrl = `${process.env.REACT_APP_API_HOST}/api/garden/${user_id}/plant/${plant_id}`;
            const fetchConfig = {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            };

            const response = await fetch(deleteUrl, fetchConfig);
            if (response.ok) {
            // Deletion successful, you can perform additional actions here if needed.
            console.log("Plant deleted successfully");
            } else {
            console.log("Failed to delete the plant");
            }
        } catch (error) {
            console.error("Error deleting the plant:", error);
        }
    };


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
                    <td><button class="btn btn-danger" onClick={handleDelete}>Delete</button></td>
                </tr>
            </tbody>
            </table>
        </div>
    );
}

export default PlantDetail;
