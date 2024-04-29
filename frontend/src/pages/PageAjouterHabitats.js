import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import AjoutHabitats from '../composants/AjoutHabitats';

const PageAjouterHabitats = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <AjoutHabitats />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageAjouterHabitats;