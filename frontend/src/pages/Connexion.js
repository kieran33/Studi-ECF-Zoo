import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {

    const navigate = useNavigate();

    const seConnecter = (e) => {
        e.preventDefault();
        console.log('connexion en cours');
    };

    const retourAccueil = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div>
            <Navigation />
            <form className="formulaire" onSubmit={seConnecter}>
                <legend>Connexion</legend>
                <input type="email" name="email" className="champsFormulaire" id="email" placeholder="Email..." required></input>
                <label htmlFor="titre"></label>

                <input type="text" name="titre" className="champsFormulaire" id="titre" placeholder="Mot de passe..." required></input>
                <label htmlFor="titre"></label>

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