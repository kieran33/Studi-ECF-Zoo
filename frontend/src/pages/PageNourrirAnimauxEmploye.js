import React from 'react';
import BarreDashboardEmploye from '../composants/BarreDashboardEmploye';
import Navigation from '../composants/Navigation';
import AjoutNourritureAnimaux from '../composants/AjoutNourritureAnimaux';
import Footer from '../composants/Footer';

const PageNourrirAnimauxEmploye = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <AjoutNourritureAnimaux />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageNourrirAnimauxEmploye;