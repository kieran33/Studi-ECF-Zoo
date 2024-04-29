import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import AjoutAnimaux from '../composants/AjoutAnimaux';

const PageAjouterAnimaux = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <AjoutAnimaux />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageAjouterAnimaux;