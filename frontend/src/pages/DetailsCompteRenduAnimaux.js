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
    const [dataNourriture, setDataNourriture] = useState([]);

    const { prenom } = useParams();

    const idNombre = Number(id);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/animaux");
        setData(reponse.data);
    };

    const loadDataNourriture = async () => {
        const reponse = await axios.get("http://localhost:3002/nourriture-animaux");
        setDataNourriture(reponse.data);
    };

    useEffect(() => {
        loadData();
        loadDataNourriture();
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
            await axios.post(`http://localhost:3002/ajout-soins/${prenom}`, formData)
        } catch (error) {
            console.log(error);
        }
    };

    const retourDashboardVeterinaire = () => {
        navigate("/dashboard-veterinaire/compte-rendu-animaux");
    }

    const filtreAnimal = dataNourriture.filter(nourriture => nourriture.prenom === animal.prenom);

    return (
        <div>
            <div className="dashboard" >
                <div>
                    <BarreDashboardVeterinaire />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Liste de ce que l'animal {animal.prenom} à consommé</h2>
                    <div className='centrer' >
                        {filtreAnimal.map((animal, index) => (
                            <div key={index} className="animal">
                                <p className="titre_service">Type de nourriture : {animal.nourriture}</p>
                                <p className="titre_service">Quantité : {animal.quantite_nourriture}</p>
                                <p className="titre_service">Date : {animal.date_nourriture}</p>
                            </div>
                        ))}
                    </div>
                    <h2 className="titre_service">Ecrire compte rendu pour l'animal {animal.prenom}</h2>
                    <div className="centrer">
                        <form className="formulaire">
                            <textarea
                                name="etat"
                                className="champsFormulaire_textarea"
                                id="etat"
                                placeholder="Etat animal..."
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