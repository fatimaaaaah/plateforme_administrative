// pages/AllServices.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import { Loader2, FileText, ShieldCheck, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simuler un chargement de données (ex: depuis API)
    setTimeout(() => {
      try {
        setServices([
          {
            id: "birth",
            title: "Extrait de naissance",
            description: "Demandez votre acte de naissance en ligne.",
            icon: <FileText className="w-6 h-6" />
          },
          {
            id: "criminal",
            title: "Casier judiciaire",
            description: "Obtenez votre casier judiciaire rapidement.",
            icon: <ShieldCheck className="w-6 h-6" />
          },
          {
            id: "nationality",
            title: "Certificat de nationalité",
            description: "Justifiez votre nationalité facilement.",
            icon: <Globe2 className="w-6 h-6" />
          }
        ]);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les services.");
        setLoading(false);
      }
    }, 1000);
  }, []);

  const handleAction = (serviceId) => {
    // Redirection ou action spécifique
    window.location.href = `/login?redirect=/request/new&type=${serviceId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez tous les documents officiels que vous pouvez demander en ligne
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-green-600" />
            <span className="ml-2 text-gray-600">Chargement des services...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 font-semibold">{error}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <ServiceCard
                key={s.id}
                icon={s.icon}
                title={s.title}
                description={s.description}
                actionText="Faire une demande"
                onAction={() => handleAction(s.id)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllServices;
