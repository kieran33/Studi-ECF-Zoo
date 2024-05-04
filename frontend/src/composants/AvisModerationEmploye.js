import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import BarreDashboardEmploye from './BarreDashboardEmploye';
import Footer from './Footer';

const AvisModerationEmploye = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/avis-non-verif')
        setData(response.data)
    }

    useEffect(() => {
        loadData();
    }, []);

    console.log('data', data)

    const supprimerAvis = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cet avis ?")) {
            axios.delete(`http://localhost:3002/supprimer/avis-non-verif/${id}`);
            setTimeout(() => loadData(), 500);
        }
    }

    const supprimerTousLesAvis = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement tout ces avis ?")) {
            axios.delete(`http://localhost:3002/supprimer/avis-verif`);
            setTimeout(() => loadData(), 500);
        }
    }

    const approuverAvis = async (id, pseudo, message) => {

        try {
            const response = await axios.post('http://localhost:3002/ajout-avis-verif', { pseudo, message }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Succès:', response.data);
            alert('Avis approuvé avec succès')
            if (response.data) {
                axios.delete(`http://localhost:3002/supprimer/avis-non-verif/${id}`);
                setTimeout(() => loadData(), 500);
            }
        } catch (error) {
            console.error('Erreur:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <div >
            <div className="dashboard">
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h1 className="titre_service">Espace modération des avis</h1>
                    <div style={{ width: "100%", display: "flex" }}>
                        <button className="bouton_zoo" style={{ margin: "auto" }} onClick={() => supprimerTousLesAvis()}>
                            Supprimer tous les avis vérifiés
                        </button>
                    </div>
                    <div className="conteneurAvis">
                        {data.map((avis, index) => (
                            <div className="avis_visiteur" index={index}>
                                <div>
                                    <h4>
                                        {avis.pseudo}
                                    </h4>
                                </div>
                                <p>{avis.message}</p>
                                <div className="centrer">
                                    <button
                                        type="button"
                                        id="boutonSupprimerAvis"
                                        name="boutonSupprimerAvis"
                                        value={avis.id}
                                        className="bouton_zoo"
                                        onClick={() => supprimerAvis(avis.id)}
                                    >
                                        Supprimer
                                    </button>
                                    <button
                                        type="button"
                                        id="boutonApprouverAvis"
                                        name="boutonApprouverAvis"
                                        value={avis.pseudo}
                                        className="bouton_zoo"
                                        onClick={() => approuverAvis(avis.id, avis.pseudo, avis.message)}
                                    >
                                        Approuver
                                    </button>
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

export default AvisModerationEmploye;