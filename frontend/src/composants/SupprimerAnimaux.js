import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SupprimerAnimaux = () => {

    const [data, setData] = useState([]);
    //const [prenom, setPrenom] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/animaux");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
        /*if (prenom.length > 0) {
            supprimerAnimaux();
        }*/
    }, [/*prenom*/]);

    const supprimerAnimaux = async (id, prenom) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cet animal ?")) {

            axios.delete(`http://localhost:3002/animaux/supprimer/${id}`);

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
            <h1 className="centrer">Liste des animaux</h1>
            <div className="centrer">
                {data.map((animal, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo" style={{ width: '250px', height: '250px', marginBottom: "40px" }}>
                            <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                src={`http://localhost:3002/image/${animal.image}`}
                                alt={animal.prenom}></img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                        </div>
                        <button className="bouton_zoo"
                            onClick={() => {
                                //setPrenom(animal.prenom)
                                supprimerAnimaux(animal.id, animal.prenom)
                            }}
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