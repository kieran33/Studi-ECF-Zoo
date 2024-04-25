import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ModificationAnimaux from '../composants/ModificationAnimaux';

const ModifierAnimaux = () => {
    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div>
                    <Navigation />
                    <ModificationAnimaux />
                </div >
            </div>
            <Footer />
        </div>
    );
};

export default ModifierAnimaux;