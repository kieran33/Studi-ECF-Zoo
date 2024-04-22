import React, { useEffect, useState } from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import axios from 'axios';

const Animaux = () => {

    const [data, setData] = useState([]);
    const [dataTrier, setDataTrier] = useState([])
    const [trie, setTrie] = useState(false);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3002/animaux");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, [dataTrier]);

    console.log(data)

    const trier = () => {
        setTrie(true);
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
    };

    const annulerTrie = () => {
        setTrie(false);
    }

    return (
        <div>
            <Navigation />
            <h1 className="centrer">Nos animaux</h1>
            <button className="bouton_zoo" onClick={trier}>Trier par ordre alphabétique</button>
            <button className="bouton_zoo" onClick={annulerTrie}>Annuler</button>
            {trie === false ?
                <div className="centrer">
                    {data.map((animal, index) => (
                        <div className="animal" key={index}>
                            <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                                <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                    /*src={`Liste-animaux/${animal.image}`} */
                                    src={`http://localhost:3002/image/${animal.image}`}
                                    alt={animal.prenom}></img>
                                <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className="centrer">
                    {dataTrier.map((animal, index) => (
                        <div className="animal" key={index}>
                            <div className="div_zoo" style={{ width: '250px', height: '250px' }}>
                                <img className="image_zoo" style={{ width: '250px', height: '250px' }}
                                    /*src={`Liste-animaux/${animal.image}`}*/
                                    src={`http://localhost:3002/image/${animal.image}`}
                                    alt={animal.prenom}></img>
                                <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <Footer />
        </div >
    );
};

export default Animaux;