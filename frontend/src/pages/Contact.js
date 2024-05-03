import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';

const Contact = () => {
    return (
        <div>
            <Navigation />
            <form className="formulaire">
                <legend>Une question ? Contactez-nous</legend>
                <input type="text" name="titre" className="champsFormulaire" id="titre" placeholder="Titre..." required></input>
                <label htmlFor="titre"></label>

                <textarea name="message" className="champsFormulaire" id="message" placeholder="Votre message..." required></textarea>
                <label htmlFor="titre"></label>

                <input type="email" name="email" className="champsFormulaire" id="email" placeholder="Votre email..." required></input>
                <label htmlFor="titre"></label>

                <div className="centrer">
                    <button type="submit" value="Envoyer" className="bouton_zoo">Envoyer</button>
                    <button type="submit" value="Envoyer" className="bouton_zoo">Annuler</button>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default Contact;