import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import AjoutAnimaux from '../composants/AjoutAnimaux';

const AjouterAnimaux = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div>
                    <Navigation />
                    <AjoutAnimaux />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default AjouterAnimaux;