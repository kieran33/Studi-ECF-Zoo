import React from 'react';
import DashboardAdminAnimaux from './DashboardAdminAnimaux';
import DashboardAdminHabitats from './DashboardAdminHabitats';
import DashboardAdminPersonnels from './DashboardAdminPersonnels';
import DashboardAdminServices from './DashboardAdminServices';
import { useNavigate } from 'react-router-dom';

const BarreDashboardAdmin = () => {

    const navigate = useNavigate();

    const etatAnimaux = () => {
        navigate("/dashboard-admin/etat-animaux");
    };

    const etatHabitats = () => {
        navigate("/dashboard-admin/etat-habitats");
    };

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
                <div>
                    <h3 className="dashboard_text">Compte-rendu vétérinaire</h3>
                    <p className="dashboard_text" onClick={etatAnimaux}>Etat animaux</p>
                    <p className="dashboard_text" onClick={etatHabitats}>Etat Habitats</p>
                </div>
            </div>
        </div>
    );
};

export default BarreDashboardAdmin;