
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


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<CitizenSignup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard-UTILISATEUR" element={<DashboardCitoyen />} /> {/* Route ajoutée */}
        <Route path="/dashboard-AGENTADMINIST" element={<DashboardAgent />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/dashboard-chef" element={<DashboardChef />} />
        <Route path="/services" element={<AllServices />} />
        <Route path="/request/new" element={<NewRequest />} />

      </Routes>
    </Router>
  );
}

export default App;
