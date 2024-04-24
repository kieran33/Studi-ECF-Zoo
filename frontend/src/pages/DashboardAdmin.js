import React from 'react';
import Navigation from '../composants/Navigation';
import CreationPersonnels from '../composants/CreationPersonnels';
import AjoutAnimaux from '../composants/AjoutAnimaux';
import SupprimerAnimaux from '../composants/SupprimerAnimaux';
import ModificationAnimaux from '../composants/ModificationAnimaux';
import AjoutServices from '../composants/AjoutServices';
import SupprimerServices from '../composants/SupprimerServices';
import ModificationServices from '../composants/ModificationServices';
import AjoutHabitats from '../composants/AjoutHabitats';
import SupprimerHabitats from '../composants/SupprimerHabitats';
import ModificationHabitats from '../composants/ModificationHabitats';
import ModificationPersonnels from '../composants/ModificationPersonnels';
import SuppressionPersonnels from '../composants/SuppressionPersonnels';

const DashboardAdmin = () => {
    return (
        <div>
            <Navigation />
            <h1>Admin</h1>
            <CreationPersonnels />
            <ModificationPersonnels />
            <SuppressionPersonnels />
            <AjoutAnimaux />
            <SupprimerAnimaux />
            <ModificationAnimaux />
            <AjoutServices />
            <SupprimerServices />
            <ModificationServices />
            <AjoutHabitats />
            <SupprimerHabitats />
            <ModificationHabitats />
        </div>
    );
};

export default DashboardAdmin;