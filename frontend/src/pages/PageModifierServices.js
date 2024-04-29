import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ModificationServices from '../composants/ModificationServices';

const PageModifierServices = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <ModificationServices />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageModifierServices;