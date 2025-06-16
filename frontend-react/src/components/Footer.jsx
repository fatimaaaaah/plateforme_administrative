import { Link } from "react-router-dom";
import { FileText, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">

          {/* Logo + description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-6 h-6 text-green-400" />
              <span className="text-lg font-bold">Plateforme</span>
            </div>
            <p className="text-gray-400 text-sm">
              Plateforme officielle pour vos démarches administratives en ligne.
              Service public numérique de la République du Sénégal.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Extrait de naissance
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Certificat de domicile
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Certificat de nationalité
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white transition-colors">
                  Aide en ligne
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Dakar, Sénégal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+221  33 633 33 33</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@plateforme.sn</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} République du Sénégal. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
