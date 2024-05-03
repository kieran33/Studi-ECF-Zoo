import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ModificationHoraires from '../composants/ModificationHoraires';

const PageModifierHoraires = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <ModificationHoraires />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageModifierHoraires;