import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const EtatHabitats = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/habitats");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h2 className="titre_service">Liste des habitats et leur état</h2>
            <div className="centrer">
                {data.map((habitat, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_etat" >
                            <img className="image_zoo_animaux"
                                src={`http://localhost:3002/image/${habitat.image}`}
                                alt={habitat.nom}>
                            </img>
                            <h4 className="titre_service">Habitat : {habitat.nom}</h4>
                            <p style={{ textAlign: "center" }}>{habitat.etat}</p>
                        </div>
                    </div>
                ))}
            </div>
        </ >
    );
};

export default EtatHabitats;