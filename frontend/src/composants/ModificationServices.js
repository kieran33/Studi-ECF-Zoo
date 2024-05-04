import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ModificationServices = () => {

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
            <h1 className="centrer">Choisissez le service à modifier</h1>
            <div className="centrer">
                {data.map((service, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                            <Link to={`/dashboard-admin/modifier-services/${service.id}`} style={{ opacity: "1" }}>
                                <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                    src={`http://localhost:3002/image/${service.image}`}
                                    alt={service.nom}>
                                </img>
                            </Link>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>Modifier "{service.nom}"</div>
                        </div>

                    </div>
                ))}
            </div>
        </div >
    );
};

export default ModificationServices;