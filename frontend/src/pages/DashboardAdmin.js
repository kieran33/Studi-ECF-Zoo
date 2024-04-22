import React from 'react';
import Navigation from '../composants/Navigation';
import CreationPersonnels from '../composants/CreationPersonnels';
import AjoutAnimaux from '../composants/AjoutAnimaux';
import SupprimerAnimaux from '../composants/SupprimerAnimaux';
import ModificationAnimaux from '../composants/ModificationAnimaux';

const DashboardAdmin = () => {
    return (
        <div>
            <Navigation />
            <h1>Admin</h1>
            <CreationPersonnels />
            <AjoutAnimaux />
            <SupprimerAnimaux />
            <ModificationAnimaux />
        </div>
    );
};

export default DashboardAdmin;