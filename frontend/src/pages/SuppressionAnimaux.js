import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import SupprimerAnimaux from '../composants/SupprimerAnimaux';

const SuppressionAnimaux = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div>
                    <Navigation />
                    <SupprimerAnimaux />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default SuppressionAnimaux;