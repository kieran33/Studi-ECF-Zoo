import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Connexion = () => {

    const [nom_utilisateur, setNom_utilisateur] = useState('');
    const [mot_de_passe, setMot_de_passe] = useState('');

    const navigate = useNavigate();

    const seConnecter = async (e) => {
        e.preventDefault();
        try {
            const reponse = await axios.post("http://localhost:3002/connexion", {
                nom_utilisateur: nom_utilisateur,
                mot_de_passe: mot_de_passe
            });
            if (reponse.data.success) {
                localStorage.setItem('role', reponse.data.role);
                localStorage.setItem('connecté', reponse.data.success);
                navigate("/");
            } else {
                alert("Identifiants incorrets");
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            alert('Erreur lors de la tentative de connexion.');
        }
    };

    const retourAccueil = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div>
            <Navigation />
            <h2 className="titre_service">Connexion</h2>
            <form className="formulaire" onSubmit={seConnecter}>
                <input
                    type="text"
                    name="nom_utilisateur"
                    className="champsFormulaire"
                    id="nom_utilisateur"
                    placeholder="Nom utilisateur..."
                    value={nom_utilisateur}
                    onChange={(e) => setNom_utilisateur(e.target.value)}
                    required
                />
                <label htmlFor="nom_utilisateur"></label>

                <input
                    type="password"
                    name="mot_de_passe"
                    className="champsFormulaire"
                    id="mot_de_passe"
                    placeholder="Mot de passe..."
                    value={mot_de_passe}
                    onChange={(e) => setMot_de_passe(e.target.value)}
                    required
                />

                <label htmlFor="mot_de_passe"></label>

                <div className="centrer">
                    <button type="submit" className="bouton_zoo">Se connecter</button>
                    <button className="bouton_zoo" onClick={retourAccueil}>Annuler</button>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default Connexion;