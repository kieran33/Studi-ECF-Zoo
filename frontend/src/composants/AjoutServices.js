import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';

const AjoutServices = () => {

    const nom = useRef("");
    const description = useRef("");
    const image = useRef("");

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

        const reponse = axios.post("http://localhost:3002/ajout-services", formData, { headers })
            .then(reponse => {
                console.log(reponse.data);
            })
            .catch(error => {
                console.error(error);
            });
        if (reponse) {
            alert(`Service ${nouveauService.nom} ajouté avec succès`);
            nom.current.value = "";
            description.current.value = "";
            image.current.value = "";
        }
    };

    const effacer = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Etes-vous sûr de vouloir effacer votre saisie ?");
        if (confirmation) {
            nom.current.value = "";
            description.current.value = "";
            image.current.value = "";
        }
    }

    return (
        <>
            <h2 className="titre_service">Ajouter un service</h2>
            <form className="formulaire" onSubmit={ajouterServices} >
                <input
                    type="text"
                    name="nom"
                    className="champsFormulaire"
                    id="nom"
                    placeholder="Nom du service..."
                    ref={nom}
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="nom"></label>

                <textarea
                    name="description"
                    className="champsFormulaire_textarea"
                    id="description"
                    placeholder="Description..."
                    ref={description}
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="description"></label>

                <input
                    type="file"
                    name="image"
                    className="champsFormulaire_image"
                    id="image"
                    ref={image}
                    onChange={imageChangement}
                    required
                />
                <label htmlFor="image"></label>

                <div className="centrer">
                    <button type="submit" className="bouton_zoo">Ajouter</button>
                    <button className="bouton_zoo" onClick={effacer}>Effacer</button>
                </div>
            </form>
        </>
    );
};

export default AjoutServices;