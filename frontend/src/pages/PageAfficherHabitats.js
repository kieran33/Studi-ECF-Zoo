import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ListeHabitats from '../composants/ListeHabitats';

const PageAfficherHabitats = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <ListeHabitats />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageAfficherHabitats;