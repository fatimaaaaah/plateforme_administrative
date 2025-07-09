import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Download } from "lucide-react";
import Navbar from "../components/Navbar";

export default function DashboardCitoyen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const requests = [
    {
      id: "REQ-001",
      type: "Extrait de naissance",
      status: "completed",
      date: "2024-01-15",
      amount: "2,500 FCFA"
    },
    {
      id: "REQ-002", 
      type: "Casier judiciaire",
      status: "processing",
      date: "2024-01-20",
      amount: "5,000 FCFA"
    },
    {
      id: "REQ-003",
      type: "Certificat de nationalité",
      status: "pending",
      date: "2024-01-22",
      amount: "10,000 FCFA"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <span className="text-green-600 font-medium">Terminé</span>;
      case "processing":
        return <span className="text-yellow-600 font-medium">En cours</span>;
      case "pending":
        return <span className="text-gray-600 font-medium">En attente</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white px-6 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Mon espace</h2>
            <p className="text-gray-600">Bienvenue, Amadou Diallo</p>
          </div>
          <p className="text-sm text-gray-600 mt-2 md:mt-0">NIN: 1234567890</p>
        </div>

        {/* Onglets */}
        <div className="flex gap-2 border-b border-gray-200 mb-6">
          {[
            { id: "overview", label: "Vue d’ensemble" },
            { id: "demandes", label: "Mes demandes" },
            { id: "documents", label: "Documents" },
            { id: "profil", label: "Profil" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-4 text-sm font-medium rounded-t ${
                activeTab === tab.id
                  ? "bg-gray-200 text-black"
                  : "text-gray-600 hover:text-black"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENU DES ONGLETS */}

        {activeTab === "overview" && (
          <>
            {/* Statistiques */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[{ label: "Total demandes", count: 3, color: "text-green-600" },
                { label: "En cours", count: 1, color: "text-yellow-600" },
                { label: "Terminées", count: 1, color: "text-green-600" },
                { label: "En attente", count: 1, color: "text-gray-600" }
              ].map((stat, index) => (
                <div key={index} className="bg-white shadow rounded p-4 text-center border">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className={`text-2xl font-semibold ${stat.color}`}>{stat.count}</p>
                </div>
              ))}
            </div>

            {/* Services rapides */}
            <h3 className="text-lg font-semibold mb-4">Services rapides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Extrait de naissance",
                  description: "Demande d'extrait de naissance",
                },
                {
                  title: "Certificat de domicile",
                  description: "Demande de certificat domicile",
                },
                {
                  title: "Certificat de nationalité",
                  description: "Demande de nationalité Sénégalaise",
                },
              ].map((service, idx) => (
                <div key={idx} className="border rounded p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-black mb-1">{service.title}</h4>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                  <button
                    onClick={() => navigate("/request/new")}
                    className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                    >
                    Faire une demande
                  </button>

                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "demandes" && (
          <>
            <h3 className="text-lg font-semibold mb-4">Mes demandes</h3>
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req.id} className="border p-4 rounded shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{req.type}</p>
                      <p className="text-sm text-gray-600">#{req.id} — {req.date}</p>
                      <p className="text-sm text-gray-600">Montant : {req.amount}</p>
                      <div className="mt-1">{getStatusBadge(req.status)}</div>
                    </div>
                    <div className="flex gap-2">
                      {req.status === "completed" && (
                        <button className="bg-green-600 text-white px-3 py-1 rounded flex items-center text-sm hover:bg-green-700">
                          <Download className="w-4 h-4 mr-1" />
                          Télécharger
                        </button>
                      )}
                      <button className="text-sm underline text-blue-600 hover:text-blue-800">
                        Détails
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "documents" && (
          <>
            <h3 className="text-lg font-semibold mb-4">Documents</h3>
            <div className="space-y-4">
              <div className="border p-4 flex justify-between items-center rounded">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold">Extrait de naissance</p>
                    <p className="text-sm text-gray-600">Généré le 15/01/2024</p>
                  </div>
                </div>
                <button className="bg-black text-white px-3 py-1 rounded flex items-center text-sm hover:bg-gray-800">
                  <Download className="w-4 h-4 mr-1" />
                  Télécharger
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "profil" && (
          <div className="text-gray-700 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Profil</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Prénom</p>
                <p>Amadou</p>
              </div>
              <div>
                <p className="font-semibold">Nom</p>
                <p>Diallo</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p>amadou.diallo@email.com</p>
              </div>
              <div>
                <p className="font-semibold">Téléphone</p>
                <p>+221 77 123 45 67</p>
              </div>
              <div>
                <p className="font-semibold">NIN</p>
                <p>1234567890</p>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Modifier les informations
            </button>
          </div>
        )}

        {/* Bouton déconnexion */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </>
  );
}
