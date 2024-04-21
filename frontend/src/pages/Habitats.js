import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Habitats = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/habitats");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    console.log(data)

    return (
        <div>
            <Navigation />
            <h1 className="centrer">Les habitats</h1>
            <div className="centrer">
                {data.map((habitat, index) => (
                    <div className="habitat" key={index}>
                        <div className="div_zoo" style={{ width: '500px', height: '300px' }}>
                            <img className="image_zoo" style={{ width: '500px', height: '300px' }} src={`Liste-habitats/${habitat.image}`} alt={habitat.nom}></img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{habitat.nom}</div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Habitats;