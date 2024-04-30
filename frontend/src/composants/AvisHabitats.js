import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AvisHabitats = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/habitats");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="centrer">
            {data.map((habitat, index) => (
                <div className="animal" key={index}>
                    <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                        <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                            src={`http://localhost:3002/image/${habitat.image}`}
                            alt={habitat.nom}>
                        </img>
                        <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{habitat.nom}</div>
                    </div>
                    <Link to={`/dashboard-veterinaire/aivs-habitats/${habitat.id}`}>
                        <button className="bouton_zoo">Modifier</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default AvisHabitats;