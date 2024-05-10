import React from 'react';
import Navigation from '../composants/Navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';

const DetailsModificationHabitats = () => {

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
        id: "",
        nom: "",
        description: "",
        image: ""
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

    const modifierHabitats = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "multipart/form-data"
        };

        const formData = new FormData();

        formData.append("nom", habitat.nom);
        formData.append("description", habitat.description);
        formData.append("image", habitat.image);

        try {
            await axios.put(`http://localhost:3002/habitats/modifier/${id}`, formData, { headers })
        } catch (error) {
            console.log(error);
        }
    };

    const imageChangement = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            console.log(img)
            setHabitat({
                ...habitat,
                image: img
            });
            console.log(habitat)
        };
    };

    const retourDashboardAdmin = () => {
        navigate("/dashboard-admin/modification-habitats");
    }

    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Modifier l'habitat {habitat.nom}</h2>
                    <div className="centrer">
                        <form className="formulaire" onSubmit={modifierHabitats}>
                            <input
                                type="text"
                                name="nom"
                                className="champsFormulaire"
                                id="nom"
                                placeholder="Nom..."
                                defaultValue={habitat.nom}
                                onChange={inputChangement}
                            />
                            <label htmlFor="nom"></label>

                            <textarea
                                name="description"
                                className="champsFormulaire_textarea"
                                id="description"
                                placeholder="Description..."
                                defaultValue={habitat.description}
                                onChange={inputChangement}
                            />
                            <label htmlFor="description"></label>

                            <input
                                type="file"
                                name="image"
                                className="champsFormulaire_image"
                                id="image"
                                onChange={imageChangement}
                            />
                            <label htmlFor="image"></label>

                            <div className="centrer">
                                <button type="submit" className="bouton_zoo">Confirmer</button>
                                <button className="bouton_zoo" onClick={retourDashboardAdmin}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsModificationHabitats;