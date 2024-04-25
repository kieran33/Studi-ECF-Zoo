import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ModificationPersonnels from '../composants/ModificationPersonnels';

const ModificationComptePersonnels = () => {
    return (
        <div>
            <div className="dashboard">
                <BarreDashboardAdmin />
                <div>
                    <Navigation />
                    <ModificationPersonnels />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default ModificationComptePersonnels;