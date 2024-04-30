import React from 'react';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import EtatAnimaux from '../composants/EtatAnimaux';

const PageEtatAnimauxAdmin = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <EtatAnimaux />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageEtatAnimauxAdmin;