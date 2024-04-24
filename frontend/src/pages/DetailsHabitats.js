import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import { Link } from 'react-router-dom';

const DetailsHabitats = () => {

    const [data, setData] = useState([]);
    const [dataHabitat, setDataHabitat] = useState([]);
    const [dataAnimaux, setDataAnimaux] = useState([]);
    const { id } = useParams();

    const idNombre = Number(id);
    console.log('id', id)

    const loadData = async () => {
        const response = await axios.get('http://localhost:3002/habitats')
        setData(response.data);
    }

    const loadDataAnimaux = async () => {
        const response = await axios.get('http://localhost:3002/animaux')
        setDataAnimaux(response.data);
    }

    useEffect(() => {
        loadData();
        loadDataAnimaux();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataHabitat(data.find(habitat => habitat.id === idNombre));
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
                        src={`http://localhost:3002/image/${dataHabitat.image}`}
                        alt={dataHabitat.nom}>
                    </img>
                    <p>{dataHabitat.nom}</p>
                    <p className="paragraphe">{dataHabitat.description}</p>
                    <h3>Liste des animaux qui vivent dans cet habitat</h3>
                    <div className="centrer">
                        {dataAnimaux.filter(animal => (animal.habitat === dataHabitat.nom)).map(animal => (
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
                    <h3>Les autres habitats</h3>
                    <div className="centrer">
                        {data.filter(habitat => (habitat.nom !== dataHabitat.nom)).map(habitat => (
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

export default DetailsHabitats;