import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ModificationAnimaux = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/animaux");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h2 className="titre_service">Choisissez l'animal à modifier</h2>
            <div className="centrer">
                {data.map((animal, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_animaux">
                            <Link to={`/dashboard-admin/modifier-animaux/${animal.id}/${animal.prenom}`} style={{ opacity: "1" }}>
                                <img className="image_zoo_animaux"
                                    src={`http://localhost:3002/image/${animal.image}`}
                                    alt={animal.prenom}>
                                </img>
                            </Link>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>Modifier "{animal.prenom}"</div>
                        </div>
                    </div>
                ))}
            </div>
        </ >
    );
};

export default ModificationAnimaux;