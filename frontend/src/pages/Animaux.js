import React, { useEffect, useState } from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Animaux = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [dataTrier, setDataTrier] = useState([])
    const [prenom, setPrenom] = useState("")
    const [id, setId] = useState("");

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/animaux");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataTrier(data.sort(function compare(a, b) {
                if (a.prenom < b.prenom) {
                    return -1;
                }
                else if (a.prenom > b.prenom) {
                    return 1;
                }
                else {
                    return 0;
                }
            }));
        }
    }, [data]);

    const augmenterVue = () => {

        try {
            axios.put(`http://localhost:3002/augmenter-vues-animal`, { prenom })
        } catch (error) {
            console.log(error);
        }
    };

    const detailsAnimaux = () => {
        navigate(`/animaux/${id}/${prenom}`)
    }

    useEffect(() => {
        augmenterVue()
        detailsAnimaux()
    }, [prenom])

    return (
        <div>
            <Navigation />
            <h2 className="titre_service">Nos animaux</h2>
            <div className="centrer">
                {dataTrier.map((animal, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_animaux" >
                            <img className="image_zoo_animaux"
                                src={`http://localhost:3002/image/${animal.image}`}
                                alt={animal.prenom}
                                onClick={() => {
                                    setPrenom(animal.prenom)
                                    setId(animal.id)
                                    augmenterVue()
                                    detailsAnimaux()
                                }}>
                            </img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div >
    );
};

export default Animaux;