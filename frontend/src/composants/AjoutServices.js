import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AjoutServices = () => {

    const navigate = useNavigate();

    const [nouveauService, setNouveauService] = useState({
        id: "",
        nom: "",
        description: "",
        image: ""
    });

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setNouveauService({
            ...nouveauService,
            [name]: nouvelleValeur,
        });
    };

    const imageChangement = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setNouveauService({
                ...nouveauService,
                image: img
            });
        };
    };

    const ajouterServices = (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "multipart/form-data"
        };

        const formData = new FormData();

        formData.append("nom", nouveauService.nom);
        formData.append("description", nouveauService.description);
        formData.append("image", nouveauService.image);

        axios.post("http://localhost:3002/ajout-services", formData, { headers })
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
            <h1 className="titre_service">Ajouter un service</h1>
            <form className="formulaire" onSubmit={ajouterServices} >
                <input
                    type="text"
                    name="nom"
                    className="champsFormulaire"
                    id="nom"
                    placeholder="Nom du service..."
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="nom"></label>

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

export default AjoutServices;