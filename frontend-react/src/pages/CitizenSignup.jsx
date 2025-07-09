import React, { useState } from "react";
import Navbar from "../components/Navbar"; // ajuste le chemin si besoin
import API from "../api"; // adapte le chemin si besoin
import { useNavigate } from "react-router-dom";

export default function CitizenSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    nin: "",
    mdp: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // État pour afficher la modale
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mdp !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const { confirmPassword, acceptTerms, ...dataToSend } = formData;
      // dataToSend contient { prenom, nom, email, telephone, nin, mdp }
      await API.post("/inscription", dataToSend);

      // Au lieu de alert(), on affiche la modale
      setShowModal(true);

    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Erreur lors de l'inscription !");
    }
  };

  // Quand on ferme la modale, on la masque et on navigue vers login
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <div className="text-green-600 text-4xl mb-2">✔️</div>
            <h1 className="text-2xl font-bold">Créer un compte</h1>
            <p className="text-sm text-gray-600">
              Rejoignez la plateforme gestion admin Sénégal
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-2">Inscription Citoyen</h2>
          <p className="text-sm text-gray-600 mb-4">
            Créez votre compte pour accéder aux services en ligne
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  placeholder="Votre prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Votre nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                name="telephone"
                placeholder="+221 XX XXX XX XX"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Numéro NIN
              </label>
              <input
                type="text"
                name="nin"
                placeholder="XXXXXXXXXXX"
                value={formData.nin}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                name="mdp"
                placeholder="••••••••"
                value={formData.mdp}  
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmer mot de passe
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                J'accepte les{" "}
                <a href="/terms" className="text-green-600 underline">
                  conditions générales
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              S’inscrire
            </button>
          </form>
        </div>
      </div>

      {/* MODALE CENTREE */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>🎉 Inscription réussie !</h2>
            <p>
              Votre inscription a été prise en compte avec succès. <br />
              Veuillez vérifier votre email pour activer votre compte avant de
              vous connecter.
            </p>
            <button onClick={handleCloseModal} style={styles.btn}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "2rem",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
  btn: {
    marginTop: "1.5rem",
    padding: "0.5rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};
