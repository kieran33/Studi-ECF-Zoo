import React, { useEffect, useState } from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BarreDashboardVeterinaire from '../composants/BarreDashboardVeterinaire';

const CompteRenduAnimaux = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/animaux");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardVeterinaire />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <div className="centrer">
                        {data.map((animal, index) => (
                            <div className="animal" key={index} style={{ marginBottom: "150px" }}>
                                <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                                    <Link to={`/dashboard-veterinaire/compte-rendu-animaux/${animal.id}`} style={{ opacity: "1" }}>
                                        <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                            src={`http://localhost:3002/image/${animal.image}`}
                                            alt={animal.prenom}>
                                        </img>
                                    </Link>
                                    <div style={{ textAlign: "center" }}>
                                        <p>{animal.prenom}</p>
                                        <p>Nourriture : {animal.nourriture}</p>
                                        <p>Quantité : {animal.quantite_nourriture}</p>
                                        <p>Date : {animal.date_nourriture}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default CompteRenduAnimaux;