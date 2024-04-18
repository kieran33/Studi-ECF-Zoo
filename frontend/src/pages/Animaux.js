import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';

const Animaux = () => {
    return (
        <div>
            <Navigation />
            <h1 className="centrer">Nos animaux</h1>
            <button className="bouton_zoo">Filtrer</button>
            <Footer />
        </div>
    );
};

export default Animaux;