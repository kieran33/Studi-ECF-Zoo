import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardVeterinaire from '../composants/BarreDashboardVeterinaire';
import AvisHabitats from '../composants/AvisHabitats';


const PageAvisHabitats = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardVeterinaire />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <AvisHabitats />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageAvisHabitats;