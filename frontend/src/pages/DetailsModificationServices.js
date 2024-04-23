import React from 'react';
import Navigation from '../composants/Navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailsModificationServices = () => {

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [dataService, setDataService] = useState([]);

    const idNombre = Number(id);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/services");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataService(data.find(service => service.id === idNombre));
        }
    }, [data]);

    const [service, setService] = useState({
        id: "",
        nom: "",
        description: "",
        image: ""
    });

    useEffect(() => {
        setService(dataService)
    }, [dataService]);

    /*console.log('data animal', dataAnimal.prenom)
    console.log('animal id useSTATE', animal.id)
    console.log('animal prenom useSTATE', animal.prenom)
    console.log('animal race useSTATE', animal.race)
    console.log('animal habitat useSTATE', animal.habitat)
    console.log('animal image useSTATE', animal.image)
    console.log('animal description useSTATE', animal.description)*/

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setService({
            ...service,
            [name]: nouvelleValeur,
        });
    };

    const modifierServices = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "multipart/form-data"
        };

        const formData = new FormData();

        formData.append("nom", service.nom);
        formData.append("description", service.description);
        formData.append("image", service.image);

        try {
            await axios.put(`http://localhost:3002/services/modifier/${id}`, formData, { headers })
        } catch (error) {
            console.log(error);
        }
    };

    const imageChangement = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            console.log(img)
            setService({
                ...service,
                image: img
            });
            console.log(service)
        };
    };

    return (
        <div>
            <Navigation />
            <div className="centrer">
                <form className="formulaire" onSubmit={modifierServices}>
                    <legend>Modifier services</legend>
                    <input
                        type="text"
                        name="nom"
                        className="champsFormulaire"
                        id="nom"
                        placeholder="Nom du service..."
                        defaultValue={service.nom}
                        //value={service.nom}
                        onChange={inputChangement}
                    />
                    <label htmlFor="nom"></label>

                    <textarea
                        name="description"
                        className="champsFormulaire"
                        id="description"
                        placeholder="Description..."
                        defaultValue={service.description}
                        //value={service.description}
                        onChange={inputChangement}
                    />
                    <label htmlFor="description"></label>

                    <input
                        type="file"
                        name="image"
                        className="champsFormulaire"
                        id="image"
                        style={{ width: "250px" }}
                        onChange={imageChangement}
                    />
                    <label htmlFor="image"></label>

                    <div className="centrer">
                        <button type="submit" className="bouton_zoo">Confirmer</button>
                        <button className="bouton_zoo" >Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DetailsModificationServices;