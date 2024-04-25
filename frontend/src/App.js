import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Animaux from './pages/Animaux';
import Habitats from './pages/Habitats';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Connexion from './pages/Connexion';
import Erreur from './pages/Erreur';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardEmploye from './pages/DashboardEmploye';
import DashboardVeterinaire from './pages/DashboardVeterinaire';
import DetailsModificationPersonnels from './pages/DetailsModificationPersonnels';
import DetailsAnimaux from './pages/DetailsAnimaux';
import DetailsHabitats from './pages/DetailsHabitats';
import DetailsModificationAnimaux from './pages/DetailsModificationAnimaux';
import DetailsModificationServices from './pages/DetailsModificationServices';
import DetailsModificationHabitats from './pages/DetailsModificationHabitats';
import CreationComptePersonnels from './pages/CreationComptePersonnels';
import ModificationComptePersonnels from './pages/ModificationComptePersonnels';
import SuppressionComptePersonnels from './pages/SuppressionComptePersonnels';
import AjouterAnimaux from './pages/AjouterAnimaux';
import ModifierAnimaux from './pages/ModifierAnimaux';
import SuppressionAnimaux from './pages/SuppressionAnimaux';
import AfficherAnimaux from './pages/AfficherAnimaux';
import AjouterServices from './pages/AjouterServices';
import ModifierServices from './pages/ModifierServices';
import SuppressionServices from './pages/SuppressionServices';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/animaux" element={<Animaux />} />
          <Route path="/animaux/:id" element={<DetailsAnimaux />} />
          <Route path="/habitats" element={<Habitats />} />
          <Route path="/habitats/:id" element={<DetailsHabitats />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/dashboard-admin/creation-personnels" element={<CreationComptePersonnels />} />
          <Route path="/dashboard-admin/modification-personnels" element={<ModificationComptePersonnels />} />
          <Route path="/dashboard-admin/suppression-personnels" element={<SuppressionComptePersonnels />} />
          <Route path="/dashboard-admin/liste-animaux" element={<AfficherAnimaux />} />
          <Route path="/dashboard-admin/ajout-animaux" element={<AjouterAnimaux />} />
          <Route path="/dashboard-admin/modification-animaux" element={<ModifierAnimaux />} />
          <Route path="/dashboard-admin/suppression-animaux" element={<SuppressionAnimaux />} />
          <Route path="/dashboard-admin/ajout-services" element={<AjouterServices />} />
          <Route path="/dashboard-admin/modification-services" element={<ModifierServices />} />
          <Route path="/dashboard-admin/suppression-services" element={<SuppressionServices />} />

          <Route path="/dashboard-admin/modifier-animaux/:id" element={<DetailsModificationAnimaux />} />
          <Route path="/dashboard-admin/modifier-services/:id" element={<DetailsModificationServices />} />
          <Route path="/dashboard-admin/modifier-habitats/:id" element={<DetailsModificationHabitats />} />
          <Route path="/dashboard-admin/modifier-personnels/:id" element={<DetailsModificationPersonnels />} />
          <Route path="/dashboard-employe" element={<DashboardEmploye />} />
          <Route path="/dashboard-veterinaire" element={<DashboardVeterinaire />} />
          <Route path="*" element={<Erreur />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
