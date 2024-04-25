import React from 'react';
import CreationPersonnels from '../composants/CreationPersonnels';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';

const CreationComptePersonnels = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div>
                    <Navigation />
                    <CreationPersonnels />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default CreationComptePersonnels;