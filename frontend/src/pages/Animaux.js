import React, { useEffect, useState } from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Animaux = () => {

    const [data, setData] = useState([]);
    const [dataTrier, setDataTrier] = useState([])

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

    console.log(data)


    /*  <div class="wrapper" >
            <div class="image_wrapper">
                <img className="image_wrapper_animaux" src={animaux} style={{ width: "500px", height: "auto" }} />
                <div class="content">
                    <h1>ANIMAUX</h1>
                </div>
            </div>
        </div >*/


    return (
        <div>
            <Navigation />
            <h1 className="centrer">Nos animaux</h1>
            {/*<div className="centrer">
                {dataTrier.map((animal, index) => (
                    <div className="animal2" key={index}>
                        <div className="div_zoo2" style={{ width: '250px', height: '250px' }}>
                            <Link to={`/animaux/${animal.id}`} >
                                <img className="image_zoo2" style={{ width: '250px', height: '250px' }}
                                    src={`http://localhost:3002/image/${animal.image}`}
                                    alt={animal.prenom}>
                                </img>
                            </Link>
                            <div className="text_zoo2" style={{ textTransform: 'capitalize' }}>
                                <h3>{animal.prenom}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>*/}

            <div className="centrer">
                {dataTrier.map((animal, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                            <Link to={`/animaux/${animal.id}`} style={{ opacity: "1" }}>
                                <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                    src={`http://localhost:3002/image/${animal.image}`}
                                    alt={animal.prenom}>
                                </img>
                            </Link>
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