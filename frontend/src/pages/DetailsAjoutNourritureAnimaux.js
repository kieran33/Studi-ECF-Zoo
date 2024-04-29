import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BarreDashboardEmploye from '../composants/BarreDashboardEmploye';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import axios from 'axios';
import { useState, useEffect } from 'react';

const DetailsAjoutNourritureAnimaux = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [dataAnimal, setDataAnimal] = useState([]);

    const idNombre = Number(id);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/animaux");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataAnimal(data.find(animal => animal.id === idNombre));
        }
    }, [data]);

    console.log('data animal', dataAnimal)

    const [animal, setAnimal] = useState({
        id: "",
        prenom: "",
        race: "",
        habitat: "",
        image: "",
        description: "",
        nourriture: "",
        quantite_nourriture: "",
        etat: "",
        date_nourriture: ""
    });

    useEffect(() => {
        setAnimal(dataAnimal)
    }, [dataAnimal]);

    console.log('setAnimal', animal)

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setAnimal({
            ...animal,
            [name]: nouvelleValeur,
        });
    };

    const AjouterNourritureAnimaux = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("nourriture", animal.nourriture);
        formData.append("quantite_nourriture", animal.quantite_nourriture);
        formData.append("etat", animal.etat);
        formData.append("date_nourriture", animal.date_nourriture);

        try {
            await axios.put(`http://localhost:3002/ajout-nourriture/${id}`, formData)
        } catch (error) {
            console.log(error);
        }
    };

    const retourDashboardEmploye = () => {
        navigate("/dashboard-employe");
    }

    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div>
                    <Navigation />
                    <div className="centrer">
                        <form className="formulaire">
                            <legend>Ajouter nourriture {animal.prenom}</legend>
                            <input
                                type="text"
                                name="nourriture"
                                className="champsFormulaire"
                                id="nourriture"
                                placeholder="Nourriture..."
                                //defaultValue={animal.nourriture}
                                value={animal.nourriture}
                                onChange={inputChangement}
                            />
                            <label htmlFor="nourriture"></label>

                            <input
                                type="text"
                                name="quantite_nourriture"
                                className="champsFormulaire"
                                id="quantite_nourriture"
                                placeholder="Quantitée..."
                                //defaultValue={animal.race}
                                value={animal.quantite_nourriture}
                                onChange={inputChangement}
                            />
                            <label htmlFor="quantite_nourriture"></label>

                            <input
                                type="text"
                                name="etat"
                                className="champsFormulaire"
                                id="etat"
                                placeholder="Etat..."
                                //defaultValue={animal.habitat}
                                value={animal.etat}
                                onChange={inputChangement}
                            />
                            <label htmlFor="etat"></label>

                            <input
                                type="datetime-local"
                                name="date_nourriture"
                                className="champsFormulaire"
                                id="date_nourriture"
                                placeholder="Date et heure"
                                style={{ width: "175px" }}
                                //defaultValue={animal.description}
                                value={animal.date_nourriture}
                                onChange={inputChangement}
                            />
                            <label htmlFor="date_nourriture"></label>

                            <div className="centrer">
                                <button type="submit" className="bouton_zoo" onClick={AjouterNourritureAnimaux}>Confirmer</button>
                                <button className="bouton_zoo" onClick={retourDashboardEmploye}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetailsAjoutNourritureAnimaux;