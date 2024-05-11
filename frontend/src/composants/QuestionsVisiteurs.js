import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import BarreDashboardEmploye from './BarreDashboardEmploye';
import Footer from './Footer';

const QuestionsVisiteurs = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/questions')
        setData(response.data)
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div >
            <div className="dashboard">
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Espace questions/messages des visiteurs</h2>
                    <div className="conteneurAvis">
                        {data.map((questions, index) => (
                            <div className="avis_visiteur" index={index}>
                                <h4 className="titre_service">Message de : {questions.email}</h4>
                                <h4 className="titre_service">Titre : {questions.titre}</h4>
                                <p className="titre_service" style={{ marginRight: "20px", marginLeft: "20px" }}>
                                    <h4>Description :</h4>
                                    {questions.description}
                                </p>
                                <button
                                    className="bouton_zoo"
                                    style={{ marginBottom: "20px" }}
                                    onClick={() => window.location = `mailto:${questions.email}`}
                                >
                                    Répondre
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default QuestionsVisiteurs;