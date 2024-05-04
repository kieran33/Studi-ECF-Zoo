import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const EtatHabitats = () => {
    const [data, setData] = useState([]);
    const [animalPrenom, setAnimalPrenom] = useState("");
    const [dateSoins, setDateSoins] = useState("");

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/habitats");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <h1 className="titre_service">Liste des habitats et leur état</h1>
            <div className="centrer">
                {data.map((habitat, index) => (
                    <div key={index}>
                        <div className="div_zoo_etat" style={{ width: '350px', height: '350px' }}>
                            <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                src={`http://localhost:3002/image/${habitat.image}`}
                                alt={habitat.nom}>
                            </img>
                            <p style={{ textAlign: "center" }}>{habitat.etat}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default EtatHabitats;