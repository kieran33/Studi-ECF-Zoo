import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdminAnimaux = () => {

    const navigate = useNavigate();

    const pageAjoutAnimaux = () => {
        navigate("/dashboard-admin/ajout-animaux");
    };

    const pageModificationAnimaux = () => {
        navigate("/dashboard-admin/modification-animaux");
    };

    const pageSuppressionAnimaux = () => {
        navigate("/dashboard-admin/suppression-animaux");
    };

    return (
        <div>
            <h3 className="dashboard_text" style={{ cursor: "auto" }}> Animaux </h3>
            <p className="dashboard_text" onClick={pageAjoutAnimaux}>Ajouter</p>
            <p className="dashboard_text" onClick={pageModificationAnimaux}>Modifier</p>
            <p className="dashboard_text" onClick={pageSuppressionAnimaux}>Supprimer</p>
        </div>
    );
};

export default DashboardAdminAnimaux;