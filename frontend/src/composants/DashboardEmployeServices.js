import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardEmployeServices = () => {

    const navigate = useNavigate();

    const pageAjoutServices = () => {
        navigate("/dashboard-employe/ajout-services");
    };

    const pageModificationServices = () => {
        navigate("/dashboard-employe/modification-services");
    };

    const pageSuppressionServices = () => {
        navigate("/dashboard-employe/suppression-services");
    };

    return (
        <div>
            <h3 className="dashboard_text" style={{ cursor: "auto" }}> Services </h3>
            <p className="dashboard_text" onClick={pageAjoutServices}>Ajouter</p>
            <p className="dashboard_text" onClick={pageModificationServices}>Modifier</p>
            <p className="dashboard_text" onClick={pageSuppressionServices}>Supprimer</p>
        </div>
    );
};

export default DashboardEmployeServices;