import React from 'react';
import DashboardAdminAnimaux from './DashboardAdminAnimaux';
import DashboardAdminHabitats from './DashboardAdminHabitats';
import DashboardAdminPersonnels from './DashboardAdminPersonnels';
import DashboardAdminServices from './DashboardAdminServices';

const BarreDashboardAdmin = () => {
    return (
        <div className="barre_dashboard_global">
            <div className="barre_dashboard">
                <h1>Dashboard admin</h1>
                <DashboardAdminPersonnels />
                <DashboardAdminAnimaux />
                <DashboardAdminHabitats />
                <DashboardAdminServices />
                <div>
                    <h3 className="dashboard_text"> Horaires </h3>
                    <p className="dashboard_text">Modifier</p>
                </div>
                <h3 className="dashboard_text">Compte-rendu vétérinaire</h3>
            </div>
        </div>
    );
};

export default BarreDashboardAdmin;