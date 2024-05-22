import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SupprimerAnimaux = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/animaux");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, [data]);

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

    const retour = () => {
        navigate("/dashboard-admin");
    };

    return (
        <>
            <h2 className="titre_service">Choisissez l'animal à supprimer</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
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
        </>
    );
};

export default SupprimerAnimaux;