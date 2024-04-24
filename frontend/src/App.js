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
import DetailsModificationAnimaux from './pages/DetailsModificationAnimaux';
import DetailsModificationServices from './pages/DetailsModificationServices';
import DetailsModificationHabitats from './pages/DetailsModificationHabitats';
import DetailsAnimaux from './pages/DetailsAnimaux';
import DetailsHabitats from './pages/DetailsHabitats';

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
          <Route path="/dashboard-admin/modifier-animaux/:id" element={<DetailsModificationAnimaux />} />
          <Route path="/dashboard-admin/modifier-services/:id" element={<DetailsModificationServices />} />
          <Route path="/dashboard-admin/modifier-habitats/:id" element={<DetailsModificationHabitats />} />
          <Route path="/dashboard-employe" element={<DashboardEmploye />} />
          <Route path="/dashboard-veterinaire" element={<DashboardVeterinaire />} />
          <Route path="*" element={<Erreur />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
