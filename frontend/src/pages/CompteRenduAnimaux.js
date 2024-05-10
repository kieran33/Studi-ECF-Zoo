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
                    <h1 className="titre_service">Choissez un animal pour voir ce qu'il a consommé</h1>
                    <div className="centrer">
                        {data.map((animal, index) => (
                            <div className="animal" key={index}>
                                <div className="div_zoo_animaux">
                                    <Link to={`/dashboard-veterinaire/compte-rendu-animaux/${animal.id}/${animal.prenom}`} style={{ opacity: "1" }}>
                                        <img className="image_zoo_animaux"
                                            src={`http://localhost:3002/image/${animal.image}`}
                                            alt={animal.prenom}>
                                        </img>
                                    </Link>
                                    <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
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