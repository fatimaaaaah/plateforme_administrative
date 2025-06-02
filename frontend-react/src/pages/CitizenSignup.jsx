// src/pages/CitizenSignup.jsx
import React, { useState } from 'react';

export default function CitizenSignup() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    nin: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    console.log("Données envoyées :", formData);
    // Tu peux envoyer `formData` à ton backend ici
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="text-green-600 text-4xl mb-2">✔️</div>
          <h1 className="text-2xl font-bold">Créer un compte</h1>
          <p className="text-sm text-gray-600">Rejoignez la plateforme gestion admin Sénégal</p>
        </div>

        <h2 className="text-xl font-semibold mb-2">Inscription Citoyen</h2>
        <p className="text-sm text-gray-600 mb-4">Créez votre compte pour accéder aux services en ligne</p>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
                <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input type="text" name="prenom" placeholder="Votre prénom" value={formData.prenom} onChange={handleChange}
                    className="w-full p-2 border rounded" required />
                </div>
                <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input type="text" name="nom" placeholder="Votre nom" value={formData.nom} onChange={handleChange}
                    className="w-full p-2 border rounded" required />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
                <input type="email" name="email" placeholder="votre@email.com" value={formData.email} onChange={handleChange}
                className="w-full p-2 border rounded" required />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input type="tel" name="telephone" placeholder="+221 XX XXX XX XX" value={formData.telephone} onChange={handleChange}
                className="w-full p-2 border rounded" required />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Numéro NIN</label>
                <input type="text" name="nin" placeholder="XXXXXXXXXXX" value={formData.nin} onChange={handleChange}
                className="w-full p-2 border rounded" required />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange}
                className="w-full p-2 border rounded" required />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                <input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" value={formData.confirmPassword} onChange={handleChange}
                className="w-full p-2 border rounded" required />
            </div>

            <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} required />
                <span>
                J'accepte les <a href="#" className="text-green-600 underline">conditions d'utilisation</a> et la
                <a href="#" className="text-green-600 underline"> politique de confidentialité</a>
                </span>
            </div>

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded">
                Créer mon compte
            </button>
        </form>

        <p className="text-sm text-center mt-4">
          Déjà un compte ? <a href="/login" className="text-green-600 underline">Se connecter</a>
        </p>
      </div>
    </div>
  );
}
