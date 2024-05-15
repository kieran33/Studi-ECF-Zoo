import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardEmploye from '../composants/BarreDashboardEmploye';


const DashboardEmploye = () => {
    return (
        <>
            <div className="dashboard_global">
                <BarreDashboardEmploye />
                <div >
                    <Navigation />
                    <h2 className="titre_service">Dashboard employé</h2>
                </div>
            </div >
            <Footer />
        </>
    );
};

export default DashboardEmploye;