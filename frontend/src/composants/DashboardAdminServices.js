import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdminServices = () => {

    const navigate = useNavigate();

    const pageAjoutServices = () => {
        navigate("/dashboard-admin/ajout-services");
    };

    const pageModificationServices = () => {
        navigate("/dashboard-admin/modification-services");
    };

    const pageSuppressionServices = () => {
        navigate("/dashboard-admin/suppression-services");
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

export default DashboardAdminServices;