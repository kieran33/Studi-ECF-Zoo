import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import SupprimerServices from '../composants/SupprimerServices';

const SuppressionServices = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div>
                    <Navigation />
                    <SupprimerServices />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default SuppressionServices;