import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ModificationHabitats = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/habitats");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <h1 className="titre_service">Choisissez l'habitat à modifier</h1>
            <div className="centrer">
                {data.map((habitat, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                            <Link to={`/dashboard-admin/modifier-habitats/${habitat.id}`} style={{ opacity: "1" }}>
                                <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                    src={`http://localhost:3002/image/${habitat.image}`}
                                    alt={habitat.nom}>
                                </img>
                            </Link>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>Modifier "{habitat.nom}"</div>
                        </div>
                    </div>
                ))
                }
            </div >
        </div>
    );
};

export default ModificationHabitats;