import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ModificationServicesEmploye = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/services");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <h1 className="centrer">Liste des services</h1>
            <div className="centrer">
                {data.map((service, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                            <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                src={`http://localhost:3002/image/${service.image}`}
                                alt={service.nom}>
                            </img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{service.nom}</div>
                        </div>
                        <Link to={`/dashboard-employe/modifier-services/${service.id}`}>
                            <button className="bouton_zoo">Modifier</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default ModificationServicesEmploye;