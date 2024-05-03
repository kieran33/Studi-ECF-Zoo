/*import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModificationHoraires = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/horaires')
        setData(response.data)
    }

    useEffect(() => {
        loadData();
    }, []);

    const [horaire, setHoraire] = useState({
        id: "",
        jour: "",
        heure_ouverture: "",
        heure_fermeture: "",
        ouvert_fermer: ""
    });

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setHoraire({
            ...horaire,
            [name]: nouvelleValeur,
        });
    };

    const modifierHoraires = async (id, jour) => {
        console.log(jour)
        console.log(id)
        alert("Horaire pour le " + jour + " modifier avec succès")
        try {
            console.log('je suis dans try')
            await axios.put(`http://localhost:3002/horaires/modifier/${id}`, horaire)
        } catch (error) {
            console.log(error);
        }
    };

    const relancerPage = () => {
        setTimeout(() => {
            window.location.reload();
        }, "1000");
    }

    const retourDashboardAdmin = () => {
        navigate("/dashboard-admin");
    }

    return (
        <div>
            <h1 className="titre_service">Modifier horaire du zoo</h1>
            <div className="conteneurHoraires">
                <form >
                    {data.map((horaire, index) => (
                        <div key={index} className="horaires">
                            <div className="horaires_details">{horaire.jour}</div>
                            {horaire.ouvert_fermer === "Fermer" ?
                                < div className="horaires_details" > {horaire.ouvert_fermer} </div>
                                :
                                <div className="horaires_details">{horaire.heure_ouverture} - {horaire.heure_fermeture}</div>
                            }
                            < div >
                                <input
                                    type="time"
                                    name="heure_ouverture"
                                    className="champsFormulaire"
                                    id="heure_ouverture"
                                    min="00:00"
                                    max="12:00"
                                    style={{ width: "auto" }}
                                    onChange={inputChangement}
                                />
                                <label htmlFor="heure_ouverture"></label>

                                <input
                                    type="time"
                                    name="heure_fermeture"
                                    className="champsFormulaire"
                                    id="heure_fermeture"
                                    min="12:00"
                                    max="00:00"
                                    style={{ width: "auto" }}
                                    onChange={inputChangement}
                                />
                                <label htmlFor="heure_fermeture"></label>

                                {horaire.ouvert_fermer === "Fermer" ?
                                    <>
                                        <input
                                            type="checkbox"
                                            name="ouvert_fermer"
                                            className="ouvert_fermer"
                                            id="ouvert_fermer"
                                            value="Ouvert"
                                            onClick={inputChangement}
                                            onChange={inputChangement}
                                        />
                                        Ouvrir
                                        < label htmlFor="ouvert_fermer" ></label>
                                    </>
                                    :
                                    <>
                                        <input
                                            type="checkbox"
                                            name="ouvert_fermer"
                                            id="ouvert_fermer"
                                            value="Fermer"
                                            onClick={inputChangement}
                                            onChange={inputChangement}
                                        />
                                        Fermer
                                        < label htmlFor="ouvert_fermer" ></label>
                                    </>
                                }
                            </div >
                            <button className="bouton_zoo"
                                onClick={() => {
                                    console.log("horaire id", horaire.id)
                                    console.log("ouvert fermer", horaire.ouvert_fermer)
                                    modifierHoraires(horaire.id, horaire.jour)
                                    relancerPage()
                                }}>
                                Modifier horaires
                            </button>
                        </div >
                    ))}
                </form>
            </div>
        </div >
    );
};

export default ModificationHoraires;*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ModificationHoraires = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/horaires");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const modifierHoraires = (id) => {
        navigate(`/dashboard-admin/modifier-horaires/${id}`)
    }

    return (
        <div>
            <h1 className="titre_service">Modifier horaire du zoo</h1>
            <div className="conteneurHoraires">
                {data.map((horaire, index) => (
                    <div key={index} className="horaires">
                        <div className="horaires_details">{horaire.jour}</div>
                        {horaire.ouvert_fermer === "Fermer" ?
                            <div className="horaires_details">{horaire.ouvert_fermer}</div>
                            :
                            <div className="horaires_details">{horaire.heure_ouverture} - {horaire.heure_fermeture}</div>
                        }
                        <button className="bouton_zoo" onClick={() => modifierHoraires(horaire.id)}>
                            Modifier
                        </button>
                    </div >
                ))}
            </div >
        </div>
    );
};

export default ModificationHoraires;