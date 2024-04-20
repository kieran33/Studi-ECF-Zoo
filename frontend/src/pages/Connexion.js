import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Connexion = () => {

    /*const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/personnels")
        setData(response.data)
    };

    useEffect(() => {
        loadData();
    }, []);

    console.log(data)*/

    const [nom_utilisateur, setNom_utilisateur] = useState('');
    const [mot_de_passe, setMot_de_passe] = useState('');

    const navigate = useNavigate();

    const seConnecter = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/connexion", {
                nom_utilisateur: nom_utilisateur,
                mot_de_passe: mot_de_passe
            });
            if (response.data.success && response.data.role === "admin") {
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('connecté', response.data.success);
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

    console.log("nom utilisateur", nom_utilisateur)
    console.log('mot de passe', mot_de_passe)

    return (
        <div>
            <Navigation />
            <form className="formulaire" onSubmit={seConnecter}>
                <legend>Connexion</legend>
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