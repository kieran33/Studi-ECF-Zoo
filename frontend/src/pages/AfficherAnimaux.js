import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ListeAnimaux from '../composants/ListeAnimaux';

const AfficherAnimaux = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div>
                    <Navigation />
                    <ListeAnimaux />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default AfficherAnimaux;