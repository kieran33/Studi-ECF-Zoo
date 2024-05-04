import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AjoutAnimaux = () => {

    const navigate = useNavigate();

    const [nouvelAnimal, setNouvelAnimal] = useState({
        id: "",
        prenom: "",
        habitat: "",
        description: "",
        image: ""
    });

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setNouvelAnimal({
            ...nouvelAnimal,
            [name]: nouvelleValeur,
        });
    };

    const imageChangement = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setNouvelAnimal({
                ...nouvelAnimal,
                image: img
            });
        };
    };

    const ajouterAnimaux = (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "multipart/form-data"
        };

        const formData = new FormData();

        formData.append("prenom", nouvelAnimal.prenom);
        formData.append("race", nouvelAnimal.race);
        formData.append("habitat", nouvelAnimal.habitat);
        formData.append("description", nouvelAnimal.description);
        formData.append("image", nouvelAnimal.image);

        axios.post("http://localhost:3002/ajout-animaux", formData, { headers })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const retourDashboardAdmin = () => {
        navigate("/dashboard-admin");
    }

    return (
        <div>
            <h1 className="titre_service">Ajouter animaux</h1>
            <form className="formulaire" onSubmit={ajouterAnimaux} >
                <input
                    type="text"
                    name="prenom"
                    className="champsFormulaire"
                    id="prenom"
                    placeholder="Prénom..."
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="prenom"></label>

                <input
                    type="text"
                    name="race"
                    className="champsFormulaire"
                    id="race"
                    placeholder="Race..."
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="race"></label>

                <input
                    type="text"
                    name="habitat"
                    className="champsFormulaire"
                    id="habitat"
                    placeholder="Habitat..."
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="habitat"></label>

                <textarea
                    name="description"
                    className="champsFormulaire"
                    id="description"
                    placeholder="Description..."
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="description"></label>

                <input
                    type="file"
                    name="image"
                    className="champsFormulaire"
                    id="image"
                    style={{ width: "250px" }}
                    onChange={imageChangement}
                    required
                />
                <label htmlFor="image"></label>

                <div className="centrer">
                    <button type="submit" className="bouton_zoo">Ajouter</button>
                    <button className="bouton_zoo" onClick={retourDashboardAdmin}>Annuler</button>
                </div>
            </form>
        </div >
    );
};

export default AjoutAnimaux;