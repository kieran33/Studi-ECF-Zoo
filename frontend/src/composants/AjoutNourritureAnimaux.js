import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AjoutNourritureAnimaux = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/animaux");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <h1 className="titre_service">Choisissez l'animal à nourrir</h1>
            <div className="centrer">
                {data.map((animal, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                            <Link to={`/dashboard-employe/ajout-nourriture/${animal.id}`} style={{ opacity: "1" }}>
                                <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                    src={`http://localhost:3002/image/${animal.image}`}
                                    alt={animal.prenom}>
                                </img>
                            </Link>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default AjoutNourritureAnimaux;