import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiFileText, FiUser } from "react-icons/fi";
import { Button } from "../components/ui/Button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Vérifie l'état de connexion à chaque changement d'URL
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = token ? {
      name: localStorage.getItem("userName"),
      email: localStorage.getItem("userEmail"),
      role: localStorage.getItem("userRole")
    } : null;
    
    setIsAuthenticated(!!token);
    setUserInfo(user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setUserInfo(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Titre */}
          <Link to="/" className="flex items-center space-x-2">
            <FiFileText className="w-8 h-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">Plateforme</span>
          </Link>

          {/* Liens visibles sur md+ */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors">
              Accueil
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-green-600 transition-colors">
              Services
            </Link>
            <Link to="/faq" className="text-gray-600 hover:text-green-600 transition-colors">
              FAQ
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Connexion ou Déconnexion */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {userInfo && (
                  <span className="hidden md:inline text-sm text-gray-600">
                    Bonjour, {userInfo.name}
                  </span>
                )}
                <Button variant="destructive" onClick={handleLogout}>
                  Se déconnecter
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link to="/login" className="flex items-center">
                    <FiUser className="w-4 h-4 mr-2" />
                    Connexion
                  </Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link to="/signup">S'inscrire</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;