import React from 'react';
import Navigation from '../composants/Navigation';
import perroquet from '../image/perroquet-zoo.png'
import Footer from '../composants/Footer'
import services from '../image/services-zoo.jpg';
import habitats from '../image/paysage-jungle.jpg';
import animaux from '../image/groupe-animaux.jpg';

const Accueil = () => {
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
                <div>
                    <img src={animaux} className="image_decouvrez" alt="animaux zoo" />
                    <p>Découvrez nos animaux</p>
                </div>
                <div>
                    <img src={habitats} className="image_decouvrez" alt="habitats zoo" />
                    <p>Découvrez les habitats</p>
                </div>
                <div>
                    <img src={services} className="image_decouvrez" width="50" alt="services zoo" />
                    <p>Découvrez nos services</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Accueil;