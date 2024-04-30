import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';

const DashboardAdmin = () => {

    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h1>Dashboard admin</h1>
                </div>
            </div >
            <Footer />
        </div>
    );
};

export default DashboardAdmin;