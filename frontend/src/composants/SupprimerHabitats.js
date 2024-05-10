import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SupprimerHabitats = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/habitats");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const supprimerHabitats = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cet habitat ?")) {
            axios.delete(`http://localhost:3002/habitats/supprimer/${id}`);
            setTimeout(() => loadData(), 500);
        };
    };

    return (
        <div>
            <h2 className="titre_service">Liste des habitats</h2>
            <div className="centrer">
                {data.map((habitat, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_animaux" style={{ marginBottom: "40px" }}>
                            <img className="image_zoo_animaux"
                                src={`http://localhost:3002/image/${habitat.image}`}
                                alt={habitat.nom}></img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{habitat.nom}</div>
                        </div>
                        <button className="bouton_zoo" onClick={() => supprimerHabitats(habitat.id)}>Supprimer</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupprimerHabitats;