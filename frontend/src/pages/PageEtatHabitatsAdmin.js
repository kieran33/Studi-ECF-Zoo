import React from 'react';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import EtatHabitats from '../composants/EtatHabitats';

const PageEtatHabitatsAdmin = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <EtatHabitats />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageEtatHabitatsAdmin;