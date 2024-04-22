import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SupprimerAnimaux = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/animaux");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const supprimerAnimaux = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cet animal ?")) {
            axios.delete(`http://localhost:3002/animaux/supprimer/${id}`);
            setTimeout(() => loadData(), 500);
        };
    };

    return (
        <div>
            <h1 className="centrer">Liste des animaux</h1>
            <div className="centrer">
                {data.map((animal, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                            <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                src={`http://localhost:3002/image/${animal.image}`}
                                alt={animal.prenom}></img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                        </div>
                        <button onClick={() => supprimerAnimaux(animal.id)}>Supprimer</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupprimerAnimaux;