import React from 'react';
import Navigation from '../composants/Navigation';
import CreationPersonnels from '../composants/CreationPersonnels';
import SuppressionPersonnels from '../composants/SuppressionPersonnels';
import ModificationPersonnels from '../composants/ModificationPersonnels';

const DashboardAdmin = () => {
    return (
        <div>
            <Navigation />
            <h1>Admin</h1>
            <CreationPersonnels />
        </div>
    );
};

export default DashboardAdmin;