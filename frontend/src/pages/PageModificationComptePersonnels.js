import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ModificationPersonnels from '../composants/ModificationPersonnels';

const PageModificationComptePersonnels = () => {
    return (
        <div>
            <div className="dashboard">
                <BarreDashboardAdmin />
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <ModificationPersonnels />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageModificationComptePersonnels;