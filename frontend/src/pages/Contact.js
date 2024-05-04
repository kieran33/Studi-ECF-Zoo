import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import { useState, useRef } from 'react';
import axios from 'axios';

const Contact = () => {

    const titre = useRef("");
    const description = useRef("");
    const email = useRef("");

    const [nouvelleQuestion, setNouvelleQuestion] = useState({
        id: "",
        titre: "",
        description: "",
        email: ""
    });

    const inputChangement = (e) => {
        const { name, value } = e.target;
        const nouvelleValeur = value;

        setNouvelleQuestion({
            ...nouvelleQuestion,
            [name]: nouvelleValeur,
        });
    };

    const EnvoyerQuestion = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3002/envoyer-questions', nouvelleQuestion, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Succès:', response.data);
            alert('Merci d\'avoir laissé votre questions, elle sera traiter prochainement')
        } catch (error) {
            console.error('Erreur:', error.response ? error.response.data : error.message);
        }
    }

    const effacer = () => {
        titre.current.value = "";
        description.current.value = "";
        email.current.value = "";
    };

    return (
        <div>
            <Navigation />
            <form className="formulaire" onSubmit={EnvoyerQuestion}>
                <legend>Une question ? Contactez-nous</legend>
                <input
                    type="text"
                    name="titre"
                    className="champsFormulaire"
                    id="titre"
                    placeholder="Titre..."
                    ref={titre}
                    onChange={inputChangement}
                    value={nouvelleQuestion.titre}
                    required>
                </input>
                <label htmlFor="titre"></label>

                <textarea
                    name="description"
                    className="champsFormulaire"
                    id="description"
                    placeholder="Votre message..."
                    ref={description}
                    onChange={inputChangement}
                    value={nouvelleQuestion.description}
                    required>
                </textarea>
                <label htmlFor="description"></label>

                <input
                    type="email"
                    name="email"
                    className="champsFormulaire"
                    id="email"
                    placeholder="Votre email..."
                    ref={email}
                    onChange={inputChangement}
                    value={nouvelleQuestion.email}
                    required>
                </input>
                <label htmlFor="email"></label>

                <div className="centrer">
                    <button type="submit" value="Envoyer" className="bouton_zoo">Envoyer</button>
                    <button className="bouton_zoo" onClick={effacer}>Annuler</button>
                </div>
            </form >
            <Footer />
        </div >
    );
};

export default Contact;