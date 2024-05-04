import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import axios from 'axios';
import { useState, useEffect } from 'react';
import BarreDashboardVeterinaire from '../composants/BarreDashboardVeterinaire';

const DetailsCompteRenduAnimaux = () => {

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

    const [animal, setAnimal] = useState({
        etat: "",
        date_soins: ""
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

    const AjouterCompteRenduAnimaux = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("etat", animal.etat);
        formData.append("date_soins", animal.date_soins)

        try {
            await axios.put(`http://localhost:3002/compte-rendu-animaux/${id}`, formData)
        } catch (error) {
            console.log(error);
        }
    };

    const retourDashboardVeterinaire = () => {
        navigate("/dashboard-veterinaire/compte-rendu-animaux");
    }

    return (
        <div>
            <div className="dashboard" >
                <div>
                    <BarreDashboardVeterinaire />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h1 className="titre_service">Ecrire compte rendu pour l'animal {animal.prenom}</h1>
                    <div className="centrer">
                        <form className="formulaire">
                            <textarea
                                name="etat"
                                className="champsFormulaire"
                                id="etat"
                                placeholder="Etat animal..."
                                style={{ width: "300px" }}
                                value={animal.etat}
                                onChange={inputChangement}
                            />
                            <label htmlFor="etat"></label>

                            <input
                                type="date"
                                name="date_soins"
                                className="champsFormulaire"
                                id="date_soins"
                                placeholder="Date et heure"
                                style={{ width: "125px" }}
                                value={animal.date_soins}
                                onChange={inputChangement}
                            />
                            <label htmlFor="date_soins"></label>

                            <div className="centrer">
                                <button type="submit" className="bouton_zoo" onClick={AjouterCompteRenduAnimaux}>Confirmer</button>
                                <button className="bouton_zoo" onClick={retourDashboardVeterinaire}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetailsCompteRenduAnimaux;