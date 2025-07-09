
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CitizenSignup from './pages/CitizenSignup';
import HomePage from './pages/HomePage'; 
import DashboardCitoyen from './pages/DashboardCitoyen';  // <- Import du dashboard
import DashboardAgent from "./pages/DashboardAgent";
import DashboardAdmin from "./pages/DashboardAdmin";
import NewRequest from './pages/NewRequest';
import DashboardChef from './pages/DashboardChef';
import AllServices from './pages/AllServices';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import AddChefPage from './pages/AddChefPage';



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<CitizenSignup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard-UTILISATEUR" element={<DashboardCitoyen />} /> {/* Route ajoutée */}
        <Route path="/dashboard-AGENTADMINIST" element={<DashboardAgent />} />
        <Route path="/dashboard-administrateur" element={<DashboardAdmin />} />
        <Route path="dashboard-chef_quartier" element={<DashboardChef />} />
        <Route path="/services" element={<AllServices />} />
        <Route path="/request/new" element={<NewRequest />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/add-chef" element={<AddChefPage />} />

      </Routes>
    </Router>
  );
}

export default App;
