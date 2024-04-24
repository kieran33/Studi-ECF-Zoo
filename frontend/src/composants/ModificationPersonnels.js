import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const ModificationPersonnels = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/personnels");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const modifierPersonnels = (id) => {
        navigate(`/dashboard-admin/modifier-personnels/${id}`)
    }

    return (
        <div>
            <h1 className="centrer">Liste du personnel</h1>
            <div className="centrer">
                {data.filter(personnel => personnel.role !== "admin").map((personnel, index) => (
                    <div className="animal" key={index}>
                        <p>Nom d'utilisateur : {personnel.nom_utilisateur}</p>
                        <p>role : {personnel.role}</p>
                        <button className="bouton_zoo" onClick={() => modifierPersonnels(personnel.id)}>Modifier</button>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default ModificationPersonnels;