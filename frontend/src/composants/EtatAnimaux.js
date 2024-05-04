import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const EtatAnimaux = () => {

    const [data, setData] = useState([]);
    const [animalPrenom, setAnimalPrenom] = useState("");
    const [dateSoins, setDateSoins] = useState("");

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/animaux");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const filtreAnimauxPrenom = data.filter(
        (animal) => (animal.prenom === animalPrenom)
    );

    const filtreAnimauxDateSoins = data.filter(
        (animal) => (animal.date_soins === dateSoins)
    );

    const reinitialiserFiltre = () => {
        setAnimalPrenom("");
        setDateSoins("");
    }

    return (
        <div>
            <h1 className="titre_service">Liste des animaux et leur état</h1>
            <div style={{ marginLeft: "20px" }}>
                <select
                    name="animal"
                    id="animal"
                    value={animalPrenom}
                    onClick={() => setDateSoins("")}
                    onChange={(e) => setAnimalPrenom(e.target.value)}
                >
                    <option value="">Choisissez l'animal</option>
                    {data.map((animal, index) => (
                        <option key={index} value={animal.prenom}>
                            {animal.prenom}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    name="date_soins"
                    className="champsFormulaire"
                    id="date_soins"
                    style={{ width: "125px" }}
                    value={dateSoins}
                    onClick={() => setAnimalPrenom("")}
                    onChange={(e) => setDateSoins(e.target.value)}
                />
                <label htmlFor="date_nourriture"></label>

                <button className="bouton_zoo" onClick={reinitialiserFiltre}>Réinitialiser</button>
            </div>

            <div>
                {animalPrenom !== "" ?
                    <div className="centrer">
                        {filtreAnimauxPrenom.map((animal, index) => (
                            <div key={index}>
                                <div className="div_zoo_etat" style={{ width: '350px', height: '350px' }}>
                                    <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                        src={`http://localhost:3002/image/${animal.image}`}
                                        alt={animal.prenom}>
                                    </img>
                                    <p style={{ textAlign: "center" }}>{animal.etat}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    dateSoins !== "" ?
                        <div className="centrer">
                            {filtreAnimauxDateSoins.map((animal, index) => (
                                <div key={index}>
                                    <div className="div_zoo_etat" style={{ width: '350px', height: '350px' }}>
                                        <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                            src={`http://localhost:3002/image/${animal.image}`}
                                            alt={animal.prenom}>
                                        </img>
                                        <p style={{ textAlign: "center" }}>{animal.etat}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div className="centrer">
                            {data.map((animal, index) => (
                                <div key={index}>
                                    <div className="div_zoo_etat" style={{ width: '350px', height: '350px' }}>
                                        <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                            src={`http://localhost:3002/image/${animal.image}`}
                                            alt={animal.prenom}>
                                        </img>
                                        <p style={{ textAlign: "center" }}>{animal.etat}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                }
            </div>
        </div >
    );
};

export default EtatAnimaux;