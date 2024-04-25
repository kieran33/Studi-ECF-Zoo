import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import SuppressionPersonnels from '../composants/SuppressionPersonnels';

const SuppressionComptePersonnels = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div>
                    <Navigation />
                    <SuppressionPersonnels />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default SuppressionComptePersonnels;