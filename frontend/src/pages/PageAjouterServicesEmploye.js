import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardEmploye from '../composants/BarreDashboardEmploye';
import AjoutServicesEmploye from '../composants/AjoutServicesEmploye';

const PageAjouterServicesEmploye = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <AjoutServicesEmploye />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageAjouterServicesEmploye;