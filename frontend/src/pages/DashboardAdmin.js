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
import Footer from '../composants/Footer';
import DashboardAdminPersonnels from '../composants/DashboardAdminPersonnels';
import DashboardAdminAnimaux from '../composants/DashboardAdminAnimaux';
import DashboardAdminHabitats from '../composants/DashboardAdminHabitats';
import DashboardAdminServices from '../composants/DashboardAdminServices';
import { useState } from 'react';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';

const DashboardAdmin = () => {

    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div>
                    <Navigation />
                    <h1>Dashboard admin</h1>
                </div>
            </div >
            <Footer />
        </div>
    );
};

export default DashboardAdmin;





















/*const DashboardAdmin = () => {

    const [ouvreCreationPersonnels, setOuvreCreationPersonnels] = useState("false");

    const ouvreCréationPersonnelsChangement = (newOuvre) => {
        setOuvreCreationPersonnels(newOuvre);
    }

    console.log(ouvreCreationPersonnels)


    return (
        <div className="dashboard_global">
            <div className="dashboard">
                <h1>Dashboard admin</h1>
                <DashboardAdminPersonnels ouvreCreationPersonnels={ouvreCréationPersonnelsChangement} />
                <DashboardAdminAnimaux />
                <DashboardAdminHabitats />
                <DashboardAdminServices />

                <div>
                    <h3 className="dashboard_text"> Voir horaires </h3>
                    <p className="dashboard_text">Modifier</p>
                </div>
                <h3 className="dashboard_text">Voir Compte-rendu vétérinaire</h3>

            </div>
            <div className="dashboard_composants">
                <Navigation />
                {ouvreCreationPersonnels === "false" ?
                    null
                    :
                    <CreationPersonnels
                        data={ouvreCreationPersonnels}
                        ouvreCreationPersonnels={ouvreCréationPersonnelsChangement} />
                }

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
                <Footer />
            </div>
        </div>
    );
};

export default DashboardAdmin;*/