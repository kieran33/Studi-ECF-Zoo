import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdminPersonnels = () => {

    const navigate = useNavigate();

    const pageCreationPersonnels = () => {
        navigate("/dashboard-admin/creation-personnels");
    };

    const pageModificationPersonnels = () => {
        navigate("/dashboard-admin/modification-personnels");
    };

    const pageSuppressionPersonnels = () => {
        navigate("/dashboard-admin/suppression-personnels")
    };

    return (
        <div>
            <h3 className="dashboard_text" style={{ cursor: "auto" }}> Personnels </h3>
            <p className="dashboard_text" onClick={pageCreationPersonnels}>Créer</p>
            <p className="dashboard_text" onClick={pageModificationPersonnels}>Modifier</p>
            <p className="dashboard_text" onClick={pageSuppressionPersonnels}>Supprimer</p>
        </div>
    );
};

export default DashboardAdminPersonnels;