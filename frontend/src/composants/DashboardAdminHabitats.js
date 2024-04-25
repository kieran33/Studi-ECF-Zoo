import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdminHabitats = () => {

    const navigate = useNavigate();

    const pageAjoutHabitats = () => {
        navigate("/dashboard-admin/ajout-habitats");
    };

    const pageModificationHabitats = () => {
        navigate("/dashboard-admin/modification-habitats");
    };

    const pageSuppressionHabitats = () => {
        navigate("/dashboard-admin/suppression-habitats");
    };

    return (
        <div>
            <h3 className="dashboard_text" style={{ cursor: "auto" }}> Habitats </h3>
            <p className="dashboard_text">Etat habitats</p>
            <p className="dashboard_text" onClick={pageAjoutHabitats}>Ajouter</p>
            <p className="dashboard_text" onClick={pageModificationHabitats}>Modifier</p>
            <p className="dashboard_text" onClick={pageSuppressionHabitats}>Supprimer</p>
        </div>
    );
};

export default DashboardAdminHabitats;