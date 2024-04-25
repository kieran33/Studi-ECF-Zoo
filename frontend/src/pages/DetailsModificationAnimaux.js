import React from 'react';
import Navigation from '../composants/Navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import Footer from '../composants/Footer';

const DetailsModificationAnimaux = () => {

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
        id: "",
        prenom: "",
        race: "",
        habitat: "",
        image: "",
        description: ""
    });

    useEffect(() => {
        setAnimal(dataAnimal)
    }, [dataAnimal]);

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

        setAnimal({
            ...animal,
            [name]: nouvelleValeur,
        });
    };

    const modifierAnimaux = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "multipart/form-data"
        };

        const formData = new FormData();

        formData.append("prenom", animal.prenom);
        formData.append("race", animal.race);
        formData.append("habitat", animal.habitat);
        formData.append("description", animal.description);
        formData.append("image", animal.image);

        try {
            await axios.put(`http://localhost:3002/animaux/modifier/${id}`, formData, { headers })
        } catch (error) {
            console.log(error);
        }
    };

    const imageChangement = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            console.log(img)
            setAnimal({
                ...animal,
                image: img
            });
            console.log(animal)
        };
    };

    const retourDashboardAdmin = () => {
        navigate("/dashboard-admin");
    }

    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div>
                    <Navigation />
                    <div className="centrer">
                        <form className="formulaire">
                            <legend>Modifier animaux</legend>
                            <input
                                type="text"
                                name="prenom"
                                className="champsFormulaire"
                                id="prenom"
                                placeholder="Prénom..."
                                defaultValue={animal.prenom}
                                //value={animal.prenom}
                                onChange={inputChangement}
                            />
                            <label htmlFor="prenom"></label>

                            <input
                                type="text"
                                name="race"
                                className="champsFormulaire"
                                id="race"
                                placeholder="Race..."
                                defaultValue={animal.race}
                                //value={animal.race}
                                onChange={inputChangement}
                            />
                            <label htmlFor="race"></label>

                            <input
                                type="text"
                                name="habitat"
                                className="champsFormulaire"
                                id="habitat"
                                placeholder="Habitat..."
                                defaultValue={animal.habitat}
                                //value={animal.habitat}
                                onChange={inputChangement}
                            />
                            <label htmlFor="habitat"></label>

                            <textarea
                                name="description"
                                className="champsFormulaire"
                                id="description"
                                placeholder="Description..."
                                defaultValue={animal.description}
                                //value={animal.description}
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
                                <button type="submit" className="bouton_zoo" onClick={modifierAnimaux}>Confirmer</button>
                                <button className="bouton_zoo" onClick={retourDashboardAdmin}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetailsModificationAnimaux;