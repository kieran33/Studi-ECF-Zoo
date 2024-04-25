import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreationPersonnels = () => {

    const [nouveauxPersonnels, setNouveauxPersonnels] = useState({
        id: "",
        nom_utilisateur: "",
        mot_de_passe: "",
        role: ""
    });

    const navigate = useNavigate();

    const inputChangement = (e) => {
        const { name, value } = e.target;

        setNouveauxPersonnels({
            ...nouveauxPersonnels,
            [name]: value,
        })
    };

    const creerPersonnels = async (e) => {
        e.preventDefault();

        const contientChiffres = /\d/.test(nouveauxPersonnels.mot_de_passe);

        const testLettres = /[a-zA-Z]/g;

        const contientLettres = testLettres.test(nouveauxPersonnels.mot_de_passe);

        if ((contientChiffres === true) && (contientLettres === true)) {
            try {
                const reponse = await axios.post("http://localhost:3002/creer-personnels", nouveauxPersonnels, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("succès: ", reponse.data);
            } catch (error) {
                console.error("Erreur :", error.reponse ? error.reponse.data : error.message);
            }
        }
        else {
            alert("Veuillez choisir un mot de passe contenant des lettres et des chiffres");
        }
    }

    const retourDashboardAdmin = () => {
        navigate("/dashboard-admin");
    }

    return (
        <div>
            <form className="formulaire" onSubmit={creerPersonnels}>
                <legend>Création compte personnel du zoo</legend>
                <input
                    type="text"
                    name="nom_utilisateur"
                    className="champsFormulaire"
                    id="nom_utilisateur"
                    placeholder="Nom utilisateur..."
                    value={nouveauxPersonnels.nom_utilisateur}
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="nom_utilisateur"></label>

                <input
                    type="password"
                    name="mot_de_passe"
                    className="champsFormulaire"
                    id="mot_de_passe"
                    placeholder="Mot de passe..."
                    value={nouveauxPersonnels.mot_de_passe}
                    onChange={inputChangement}
                    required
                />

                <input
                    type="radio"
                    name="role"
                    className="champsFormulaire"
                    id="role"
                    value="employé"
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="role">Employé</label>

                <input
                    type="radio"
                    name="role"
                    className="champsFormulaire"
                    id="role"
                    value="vétérinaire"
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="role">Vétérinaire</label>

                <div className="centrer">
                    <button type="submit" className="bouton_zoo">Créer</button>
                    <button className="bouton_zoo" onClick={retourDashboardAdmin}>Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default CreationPersonnels;