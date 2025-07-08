import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Download } from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";

export default function DashboardCitoyen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:8082/utilisateurs/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        });

        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur lors du chargement du profil");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

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
        return <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm">Terminé</span>;
      case "processing":
        return <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-sm">En cours</span>;
      case "pending":
        return <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-sm">En attente</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white px-6 pt-10">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Mon espace</h2>
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
                  ? "bg-yellow-100 text-black"
                  : "text-gray-600 hover:text-black"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total demandes", count: 3, color: "text-green-600" },
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

            <h3 className="text-xl font-semibold mb-4">Services rapides</h3>
            <div className="grid md:grid-cols-3 gap-6">
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
                <Card key={idx} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardHeader className="text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-green-600" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <button
                      onClick={() => navigate("/request/new")}
                      className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                    >
                      Faire une demande
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* DEMANDES */}
        {activeTab === "demandes" && (
          <>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Mes demandes</h3>
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req.id} className="border p-5 rounded shadow hover:shadow-md transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg text-gray-800">{req.type}</p>
                      <p className="text-sm text-gray-500">#{req.id} — {req.date}</p>
                      <p className="text-sm text-gray-500">Montant : {req.amount}</p>
                      <div className="mt-1">{getStatusBadge(req.status)}</div>
                    </div>
                    <div className="flex gap-2">
                      {req.status === "completed" && (
                        <button className="bg-green-600 text-white px-3 py-1 rounded flex items-center text-sm hover:bg-green-700">
                          <Download className="w-4 h-4 mr-1" />
                          Télécharger
                        </button>
                      )}
                      <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition text-sm">
                        Détails
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* DOCUMENTS */}
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

        {/* PROFIL */}
        {activeTab === "profil" && (
          <div className="space-y-6 bg-yellow-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Mon Profil</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Prénom", value: "Amadou" },
                { label: "Nom", value: "Diallo" },
                { label: "Email", value: "amadou.diallo@email.com" },
                { label: "Téléphone", value: "+221 77 123 45 67" },
                { label: "NIN", value: "1234567890" },
              ].map((item, idx) => (
                <div key={idx}>
                  <p className="text-sm font-semibold text-gray-600">{item.label}</p>
                  <p className="text-lg font-medium">{item.value}</p>
                </div>
              ))}
            </div>
           <div className="flex justify-end">
            <button className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
              Modifier les informations
            </button>
          </div>


          </div>
        )}
      </div>
    </>
  );
}
