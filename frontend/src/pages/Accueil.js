import React from 'react';
import Navigation from '../composants/Navigation';
import perroquet from '../image/perroquet-zoo.png'
import Footer from '../composants/Footer'
import services from '../image/services-zoo.jpg';
import habitats from '../image/paysage-jungle.jpg';
import animaux from '../image/groupe-animaux.jpg';
import { useNavigate } from 'react-router-dom';

const Accueil = () => {

    const navigate = useNavigate();

    const directionAnimaux = () => {
        navigate("/animaux");
    };

    const directionHabitats = () => {
        navigate("/habitats");
    };

    const directionServices = () => {
        navigate("/services");
    };

    return (
        <div>
            <Navigation />
            <div className="centrer">
                <img src={perroquet} width="300" height="auto" alt="perroquet zoo" />
            </div>
            <div className="centrer">
                <p className="paragraphe">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ex tellus, sagittis porttitor tempor ut, fringilla ut diam.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    Donec sagittis fermentum nisi sed venenatis. Mauris ac volutpat ante, sed luctus libero.</p>
            </div>
            <div className="centrer">
                <div className="div_zoo" onClick={directionAnimaux}>
                    <img src={animaux} className="image_zoo" alt="animaux zoo" />
                    <div className="text_zoo">Découvrez nos animaux</div>
                </div>
                <div className="div_zoo" onClick={directionHabitats}>
                    <img src={habitats} className="image_zoo" alt="habitats zoo" />
                    <div className="text_zoo">Découvrez les habitats</div>
                </div>
                <div className="div_zoo" onClick={directionServices}>
                    <img src={services} className="image_zoo" width="50" alt="services zoo" />
                    <div className="text_zoo">Découvrez nos services</div>
                </div>

                <div class="wrapper">
                    <div class="image_wrapper">
                        <img className="image_wrapper_animaux" src={animaux} style={{ width: "500px", height: "auto" }} />
                        <div class="content">
                            <h1>ANIMAUX</h1>
                        </div>
                    </div>
                </div>

            </div>


            <Footer />
        </div >
    );
};

export default Accueil;