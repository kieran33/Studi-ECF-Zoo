import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ListeAnimaux from '../composants/ListeAnimaux';

const PageAfficherAnimaux = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <ListeAnimaux />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageAfficherAnimaux;