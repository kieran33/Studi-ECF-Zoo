import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import Famille from '../image/famille_animaux.png';
import Habitat from '../image/habitat_animaux.png';
import { Link } from 'react-router-dom';

const DetailsAnimaux = () => {

    const [data, setData] = useState([]);
    const [dataAnimal, setDataAnimal] = useState([]);
    const [dataHabitat, setDataHabitat] = useState([]);
    const { id } = useParams();

    const idNombre = Number(id);
    console.log('id', id)

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/animaux')
        setData(response.data);
    }

    const loadDataHabitat = async () => {
        const response = await axios.get('http://localhost:3002/habitats')
        setDataHabitat(response.data);
    }

    useEffect(() => {
        loadData();
        loadDataHabitat();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataAnimal(data.find(animal => animal.id === idNombre));
        }
    }, [data]);

    const recharger = () => {
        window.reload();
    };

    return (
        <div>
            <Navigation />
            <div className="centrer">
                <div className="animal" >
                    <img className="image_zoo_details"
                        src={`http://localhost:3002/image/${dataAnimal.image}`}
                        alt={dataAnimal.prenom}>
                    </img>
                    <p>{dataAnimal.prenom}</p>
                    <p className="paragraphe">{dataAnimal.description}</p>
                    <div className="centrer">
                        <div className="service" style={{ marginRight: "75px" }}>
                            <img src={Famille}></img>
                            <p>{dataAnimal.race}</p>
                        </div>
                        <div className="service" style={{ marginLeft: "75px" }}>
                            <img src={Habitat} style={{ width: "50px", height: "50px" }}></img>
                            <p>{dataAnimal.habitat}</p>
                        </div>
                    </div>
                    <h3>Liste des autres animaux qui vivent dans l'habitat {dataAnimal.habitat}</h3>
                    <div className="centrer">
                        {data.filter(animal => (animal.habitat === dataAnimal.habitat) && (animal.prenom !== dataAnimal.prenom)).map(animal => (
                            <div>
                                {
                                    <div className="animal">
                                        <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                                            <Link to={`/animaux/${animal.id}`} onClick={recharger} style={{ opacity: "1" }}>
                                                <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                                    src={`http://localhost:3002/image/${animal.image}`}
                                                    alt={animal.prenom}>
                                                </img>
                                            </Link>
                                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    <h3>Liste des autres habitats</h3>
                    <div className="centrer">
                        {dataHabitat.filter(habitat => habitat.nom !== dataAnimal.habitat).map(habitat => (
                            <div>
                                {
                                    <div className="animal">
                                        <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                                            <Link to={`/habitats/${habitat.id}`} onClick={recharger} style={{ opacity: "1" }}>
                                                <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                                    src={`http://localhost:3002/image/${habitat.image}`}
                                                    alt={habitat.nom}>
                                                </img>
                                            </Link>
                                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{habitat.nom}</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default DetailsAnimaux;