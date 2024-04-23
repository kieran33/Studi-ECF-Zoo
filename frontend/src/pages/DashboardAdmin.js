import React from 'react';
import Navigation from '../composants/Navigation';
import CreationPersonnels from '../composants/CreationPersonnels';
import AjoutAnimaux from '../composants/AjoutAnimaux';
import SupprimerAnimaux from '../composants/SupprimerAnimaux';
import ModificationAnimaux from '../composants/ModificationAnimaux';
import AjoutServices from '../composants/AjoutServices';
import SupprimerServices from '../composants/SupprimerServices';
import ModificationServices from '../composants/ModificationServices';

const DashboardAdmin = () => {
    return (
        <div>
            <Navigation />
            <h1>Admin</h1>
            <CreationPersonnels />
            <AjoutAnimaux />
            <SupprimerAnimaux />
            <ModificationAnimaux />
            <AjoutServices />
            <SupprimerServices />
            <ModificationServices />
        </div>
    );
};

export default DashboardAdmin;