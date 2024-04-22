import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ModificationAnimaux = () => {

    const [data, setData] = useState([]);
    const [ouvrirModifAnimal, setOuvrirModifAnimal] = useState(false);
    const [modifAnimal, setModifAnimal] = useState();

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/animaux");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const modifierAnimaux = () => {

    }

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setModifAnimal({
            ...modifAnimal,
            [name]: nouvelleValeur,
        });
    };

    const imageChangement = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setModifAnimal({
                ...modifAnimal,
                image: img
            });
        };
    };

    return (
        <div>
            <h1 className="centrer">Liste des animaux</h1>
            <div className="centrer">
                {data.map((animal, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                            <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                src={`http://localhost:3002/image/${animal.image}`}
                                alt={animal.prenom}>
                            </img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                        </div>
                        <button onClick={() => setOuvrirModifAnimal(true)}>Modifier</button>
                        {ouvrirModifAnimal === true ?
                            <form className="formulaire" onSubmit={modifierAnimaux} >
                                <legend>Modifier animaux</legend>
                                <input
                                    type="text"
                                    name="prenom"
                                    className="champsFormulaire"
                                    id="prenom"
                                    placeholder="Prénom..."
                                    defaultValue={animal.prenom}
                                    onChange={inputChangement}
                                    required
                                />
                                <label htmlFor="prenom"></label>

                                <input
                                    type="text"
                                    name="race"
                                    className="champsFormulaire"
                                    id="race"
                                    placeholder="Race..."
                                    defaultValue={animal.race}
                                    onChange={inputChangement}
                                    required
                                />
                                <label htmlFor="race"></label>

                                <input
                                    type="text"
                                    name="habitat"
                                    className="champsFormulaire"
                                    id="habitat"
                                    placeholder="Habitat..."
                                    defaultValue={animal.habitat}
                                    onChange={inputChangement}
                                    required
                                />
                                <label htmlFor="habitat"></label>

                                <textarea
                                    name="description"
                                    className="champsFormulaire"
                                    id="description"
                                    placeholder="Description..."
                                    defaultValue={animal.description}
                                    onChange={inputChangement}
                                    required
                                />
                                <label htmlFor="description"></label>

                                <input
                                    type="file"
                                    name="image"
                                    className="champsFormulaire"
                                    id="image"
                                    onChange={imageChangement}
                                    required
                                />
                                <label htmlFor="image"></label>

                                <div className="centrer">
                                    <button type="submit" className="bouton_zoo">Confirmer</button>
                                    <button className="bouton_zoo" onClick={() => setOuvrirModifAnimal(false)}>Annuler</button>
                                </div>
                            </form>
                            :
                            null
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModificationAnimaux;