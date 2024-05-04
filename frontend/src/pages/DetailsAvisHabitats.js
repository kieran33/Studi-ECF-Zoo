import React from 'react';
import Navigation from '../composants/Navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BarreDashboardVeterinaire from '../composants/BarreDashboardVeterinaire';
import { useNavigate } from 'react-router-dom';
import Footer from '../composants/Footer';

const DetailsAvisHabitats = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [dataHabitat, setDataHabitat] = useState([]);

    const idNombre = Number(id);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/habitats");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataHabitat(data.find(habitat => habitat.id === idNombre));
        }
    }, [data]);

    const [habitat, setHabitat] = useState({
        etat: ""
    });

    useEffect(() => {
        setHabitat(dataHabitat)
    }, [dataHabitat]);

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setHabitat({
            ...habitat,
            [name]: nouvelleValeur,
        });
    };

    const avisHabitats = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("etat", habitat.etat);

        try {
            await axios.put(`http://localhost:3002/avis-habitats/${id}`, formData)
        } catch (error) {
            console.log(error);
        }
    };

    const retourDashboardVeterinaire = () => {
        navigate("/dashboard-veterinaire/avis-habitats");
    }

    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardVeterinaire />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h1 className="titre_service">Ecrire compte rendu pour l'habitat {habitat.nom} </h1>
                    <div className="centrer">
                        <form className="formulaire" onSubmit={avisHabitats}>
                            <textarea
                                name="etat"
                                className="champsFormulaire"
                                id="etat"
                                placeholder="Etat de l'habitat..."
                                defaultValue={habitat.etat}
                                onChange={inputChangement}
                            />
                            <label htmlFor="etat"></label>

                            <div className="centrer">
                                <button type="submit" className="bouton_zoo">Confirmer</button>
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

export default DetailsAvisHabitats;