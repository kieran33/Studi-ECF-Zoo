import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Footer = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/horaires')
        setData(response.data)
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="footer">
            <div className="conteneurHoraires">
                <h3>Horaire d'ouverture du zoo</h3>
                {data.map((horaire, index) => (
                    <div key={index} className="footer_horaires">
                        <div>{horaire.jour}</div>
                        {horaire.ouvert_fermer === "Fermer" ?
                            < div > {horaire.ouvert_fermer} </div>
                            :
                            <div>{horaire.heure_ouverture} - {horaire.heure_fermeture}</div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Footer;