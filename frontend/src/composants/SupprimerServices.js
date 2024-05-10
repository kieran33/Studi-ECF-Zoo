import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SupprimerServices = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/services");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const supprimerServices = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement ce service ?")) {
            axios.delete(`http://localhost:3002/services/supprimer/${id}`);
            setTimeout(() => loadData(), 500);
        };
    };

    return (
        <div>
            <h2 className="titre_service">Supprimer services</h2>
            <div className="centrer">
                {data.map((service, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_service" style={{ marginBottom: "40px" }}>
                            <img className="image_zoo_service"
                                src={`http://localhost:3002/image/${service.image}`}
                                alt={service.nom}>
                            </img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{service.nom}</div>
                        </div>
                        <button className="bouton_zoo" onClick={() => supprimerServices(service.id)} >Supprimer</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupprimerServices;