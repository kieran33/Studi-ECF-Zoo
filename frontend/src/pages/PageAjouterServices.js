import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import AjoutServices from '../composants/AjoutServices';

const PageAjouterServices = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <AjoutServices />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default PageAjouterServices;