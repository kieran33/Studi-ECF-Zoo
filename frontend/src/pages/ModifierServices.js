import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ModificationServices from '../composants/ModificationServices';

const ModifierServices = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div>
                    <Navigation />
                    <ModificationServices />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default ModifierServices;