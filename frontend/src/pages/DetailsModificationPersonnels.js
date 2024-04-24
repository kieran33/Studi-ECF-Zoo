import React from 'react';
import Navigation from '../composants/Navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailsModificationPersonnels = () => {

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [dataPersonnel, setDataPersonnel] = useState([]);

    const idNombre = Number(id);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/personnels");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataPersonnel(data.find(personnel => personnel.id === idNombre));
        }
    }, [data]);

    const [personnel, setPersonnel] = useState({
        id: "",
        nom_utilisateur: "",
        mot_de_passe: "",
        role: ""
    });

    useEffect(() => {
        setPersonnel(dataPersonnel)
    }, [dataPersonnel]);

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setPersonnel({
            ...personnel,
            [name]: nouvelleValeur,
        });
    };

    const modifierPersonnels = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3002/personnels/modifier/${id}`, personnel)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navigation />
            <div className="centrer">
                <form className="formulaire" onSubmit={modifierPersonnels}>
                    <legend>Modifier personnels</legend>
                    <input
                        type="text"
                        name="nom_utilisateur"
                        className="champsFormulaire"
                        id="nom_utilisateur"
                        placeholder="Nom utilisateur..."
                        defaultValue={personnel.nom_utilisateur}
                        onChange={inputChangement}
                    />
                    <label htmlFor="nom_utilisateur"></label>

                    <input
                        type="password"
                        name="mot_de_passe"
                        className="champsFormulaire"
                        id="mot_de_passe"
                        placeholder="Mot de passe..."
                        defaultValue={personnel.mot_de_passe}
                        onChange={inputChangement}
                    />

                    <input
                        type="radio"
                        name="role"
                        className="champsFormulaire"
                        id="role"
                        value="employé"
                        onChange={inputChangement}
                    />
                    <label htmlFor="role">Employé</label>

                    <input
                        type="radio"
                        name="role"
                        className="champsFormulaire"
                        id="role"
                        value="vétérinaire"
                        onChange={inputChangement}
                    />
                    <label htmlFor="role">Vétérinaire</label>

                    <div className="centrer">
                        <button type="submit" className="bouton_zoo">Confirmer</button>
                        <button className="bouton_zoo" >Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DetailsModificationPersonnels;