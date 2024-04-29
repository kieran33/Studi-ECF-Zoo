import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';

const DashboardAdmin = () => {

    return (
        <div>
            <div className="dashboard">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
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