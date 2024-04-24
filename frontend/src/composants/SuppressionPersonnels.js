import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SuppressionPersonnels = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/personnels");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const supprimerPersonnels = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement ce personnel ?")) {
            axios.delete(`http://localhost:3002/personnels/supprimer/${id}`);
            setTimeout(() => loadData(), 500);
        };
    };

    return (
        <div>
            <h1 className="centrer">Liste du personnel</h1>
            <div className="centrer">
                {data.filter(personnel => personnel.role !== "admin").map((personnel, index) => (
                    <div className="animal" key={index}>
                        <p>Nom d'utilisateur : {personnel.nom_utilisateur}</p>
                        <p>role : {personnel.role}</p>
                        <button className="bouton_zoo" onClick={() => supprimerPersonnels(personnel.id)}>Supprimer</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuppressionPersonnels;