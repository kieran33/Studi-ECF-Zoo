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

    const supprimerAnimaux = async (id, prenom) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cet animal ?")) {

            axios.delete(`http://localhost:3002/animaux/supprimer/${id}`);

            axios.delete(`http://localhost:3002/animaux-nourriture/supprimer/${prenom}`);

            axios.delete(`http://localhost:3002/animaux-soins/supprimer/${prenom}`);

            try {
                await axios.delete(`http://localhost:3002/supprimer-animaux-vues/${prenom}`);
            } catch (error) {
                console.log(error)
            }

            setTimeout(() => loadData(), 500);
        };
    };

    return (
        <div>
            <h2 className="titre_service">Choisissez l'animal à supprimer</h2>
            <div className="centrer">
                {data.map((animal, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_animaux" style={{ marginBottom: "40px" }}>
                            <img className="image_zoo_animaux"
                                src={`http://localhost:3002/image/${animal.image}`}
                                alt={animal.prenom}></img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                        </div>
                        <button className="bouton_zoo"
                            onClick={() => supprimerAnimaux(animal.id, animal.prenom)}
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupprimerAnimaux;