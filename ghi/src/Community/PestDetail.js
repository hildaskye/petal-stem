import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useToken from "../auth forms/newindex.tsx";
import { useNavigate } from "react-router-dom";

function PestDetail(props) {
    const [pest, setPest] = useState(null);
    const { pest_id } = useParams();
    const { token } = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const pestUrl = `${process.env.REACT_APP_API_HOST}/api/pest/${pest_id}`;
            const fetchConfig = {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
        const response = await fetch(pestUrl, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            setPest(data[0]);
            console.log("data=", data)
        }
    };
    getData();
    }, [token, pest_id]);

    if (pest === null) {
        return <div>Loading...</div>;
    }

    const handleEdit = (pestId) => {
        navigate(`/pest/${pestId}/edit`);
    };

    const handleDelete = async () => {
        try {
            const deleteUrl = `${process.env.REACT_APP_API_HOST}/api/pest/${pest_id}`;
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
            console.log("Pest deleted successfully");
            } else {
            console.log("Failed to delete pest");
            }
        } catch (error) {
            console.error("Error deleting pest:", error);
        }
    };



    return (
        <div>
            <h1 className="heading">Detail about this pest</h1>
            <table className="table table-striped">
            <thead>
                <tr>
                <th>Pest Name</th>
                <th>Picture</th>
                <th>Log</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{pest.name}</td>
                    <td>{pest.picture}</td>
                    <td>{pest.log}</td>
                    <td>
                        <button className= "btn btn-outline-secondary" onClick={handleEdit}>Edit</button>
                        <button className="btn btn-outline-danger" onClick={handleDelete} style={{ marginLeft: "10px" }}>Delete</button>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    );
}

export default PestDetail;
