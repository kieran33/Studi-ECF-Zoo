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
    const { prenom } = useParams();

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

    const [animal, setAnimal] = useState({
        nourriture: "",
        quantite_nourriture: "",
        date_nourriture: ""
    });

    useEffect(() => {
        setAnimal(dataAnimal)
    }, [dataAnimal]);

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setAnimal({
            ...animal,
            [name]: nouvelleValeur,
        });
    };

    /*const AjouterNourritureAnimaux = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("nourriture", animal.nourriture);
        formData.append("quantite_nourriture", animal.quantite_nourriture);
        formData.append("date_nourriture", animal.date_nourriture);

        try {
            await axios.put(`http://localhost:3002/ajout-nourriture/${id}`, formData)
        } catch (error) {
            console.log(error);
        }
    };*/

    const AjouterNourritureAnimaux = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("nourriture", animal.nourriture);
        formData.append("quantite_nourriture", animal.quantite_nourriture);
        formData.append("date_nourriture", animal.date_nourriture);

        try {
            await axios.put(`http://localhost:3002/ajout-nourriture2/${prenom}`, formData)
        } catch (error) {
            console.log(error);
        }
    };

    const retourDashboardEmploye = () => {
        navigate("/dashboard-employe/ajout-nourriture");
    }

    return (
        <div>
            <div className="dashboard" >
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h1 className="titre_service">Ajouter nourriture {animal.prenom}</h1>
                    <div className="centrer">
                        <form className="formulaire" onSubmit={AjouterNourritureAnimaux}>
                            <input
                                type="text"
                                name="nourriture"
                                className="champsFormulaire"
                                id="nourriture"
                                placeholder="Nourriture de l'animal..."
                                style={{ width: "200px" }}
                                value={animal.nourriture}
                                onChange={inputChangement}
                            />
                            <label htmlFor="nourriture"></label>

                            <input
                                type="text"
                                name="quantite_nourriture"
                                className="champsFormulaire"
                                id="quantite_nourriture"
                                placeholder="Quantitée nourriture..."
                                style={{ width: "200px" }}
                                value={animal.quantite_nourriture}
                                onChange={inputChangement}
                            />
                            <label htmlFor="quantite_nourriture"></label>

                            <input
                                type="date"
                                name="date_nourriture"
                                className="champsFormulaire"
                                id="date_nourriture"
                                style={{ width: "200px" }}
                                value={animal.date_nourriture}
                                onChange={inputChangement}
                            />
                            <label htmlFor="date_nourriture"></label>

                            <div className="centrer">
                                <button type="submit" className="bouton_zoo">Confirmer</button>
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