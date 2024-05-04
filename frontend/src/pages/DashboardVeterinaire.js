import React from 'react';
import Navigation from '../composants/Navigation';
import BarreDashboardVeterinaire from '../composants/BarreDashboardVeterinaire';
import Footer from '../composants/Footer';

const DashboardVeterinaire = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardVeterinaire />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h1 className="titre_service">Dashboard vétérinaire</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardVeterinaire;