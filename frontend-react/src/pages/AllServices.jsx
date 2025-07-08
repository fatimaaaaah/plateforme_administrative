// pages/AllServices.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader2, FileText, ShieldCheck, Globe2, CreditCard, Users, CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      try {
        setServices([
          {
            id: "birth",
            title: "Extrait de naissance",
            description: "Demandez votre acte de naissance en ligne.",
            icon: <FileText className="w-8 h-8 text-green-600" />,
            color: "bg-green-600 hover:bg-green-700"
          },
          {
            id: "criminal",
            title: "Casier judiciaire",
            description: "Obtenez votre casier judiciaire rapidement.",
            icon: <ShieldCheck className="w-8 h-8 text-yellow-600" />,
            color: "bg-yellow-500 hover:bg-yellow-600"
          },
          {
            id: "nationality",
            title: "Certificat de nationalité",
            description: "Justifiez votre nationalité facilement.",
            icon: <Globe2 className="w-8 h-8 text-red-600" />,
            color: "bg-red-600 hover:bg-red-700"
          },
          {
            id: "payment",
            title: "Paiement en ligne",
            description: "Effectuez vos paiements sécurisés rapidement.",
            icon: <CreditCard className="w-8 h-8 text-blue-600" />,
            color: "bg-blue-600 hover:bg-blue-700"
          },
          {
            id: "family",
            title: "Certificat de mariage",
            description: "Obtenez votre certificat de mariage officiel.",
            icon: <Users className="w-8 h-8 text-purple-600" />,
            color: "bg-purple-600 hover:bg-purple-700"
          },
          {
            id: "appointment",
            title: "Prise de rendez-vous",
            description: "Planifiez vos rendez-vous administratifs facilement.",
            icon: <CalendarCheck className="w-8 h-8 text-pink-600" />,
            color: "bg-pink-600 hover:bg-pink-700"
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
    window.location.href = `/login?redirect=/request/new&type=${serviceId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Nos Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez tous les documents officiels que vous pouvez demander en ligne
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 space-x-2">
            <Loader2 className="w-6 h-6 animate-spin text-green-600" />
            <span className="text-gray-600 font-medium">Chargement des services...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 font-semibold">{error}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div
                key={s.id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
              >
                <div className="text-center mb-4">
                  {s.icon}
                  <h3 className="text-xl font-semibold mt-4 text-gray-800">{s.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{s.description}</p>
                </div>
                <Button
                  onClick={() => handleAction(s.id)}
                  className={`w-full text-white mt-6 ${s.color}`}
                >
                  Faire une demande
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllServices;
