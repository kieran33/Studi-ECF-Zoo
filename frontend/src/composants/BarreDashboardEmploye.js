import React from 'react';
import DashboardEmployeServices from './DashboardEmployeServices';
import { useNavigate } from 'react-router-dom';

const BarreDashboardEmploye = () => {

    const navigate = useNavigate();

    const nourrirAnimaux = () => {
        navigate("/dashboard-employe/ajout-nourriture")
    }

    const modererAvis = () => {
        navigate("/dashboard-employe/moderer-avis")
    };

    const voirQuestionVisiteurs = () => {
        navigate("/dashboard-employe/questions-visiteurs")
    };

    return (
        <div className="barre_dashboard_global">
            <div className="barre_dashboard">
                <h1>Dashboard employé</h1>
                <DashboardEmployeServices />
                <h3 className="dashboard_text" onClick={nourrirAnimaux}>Nourrir animaux</h3>
                <h3 className="dashboard_text" onClick={modererAvis}>Avis visiteurs</h3>
                <h3 className="dashboard_text" onClick={voirQuestionVisiteurs}>Questions visiteurs</h3>
            </div>
        </div>
    );
};

export default BarreDashboardEmploye;