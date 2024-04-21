import React from 'react';
import Navigation from '../composants/Navigation';
import CreationPersonnels from '../composants/CreationPersonnels';

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