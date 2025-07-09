import React, { useState } from "react";

export default function AddChefPage() {
  const [data, setData] = useState({
    prenom: "",
    nom: "",
    quartier: "",
    email: "",
    telephone: "",
    nin: ""
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Chef de quartier ajouté :", data); // mock
    alert("Chef de quartier enregistré (simulation).");
    setData({
      prenom: "",
      nom: "",
      quartier: "",
      email: "",
      telephone: "",
      nin: ""
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-lg">
      <h1 className="text-3xl font-bold text-center mb-8">
        Ajouter un chef de quartier
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={data.prenom}
            onChange={handleChange}
            className="w-1/2 p-3 border rounded"
            required
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={data.nom}
            onChange={handleChange}
            className="w-1/2 p-3 border rounded"
            required
          />
        </div>

        <input
          type="text"
          name="quartier"
          placeholder="Quartier"
          value={data.quartier}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="E‑mail"
          value={data.email}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="tel"
          name="telephone"
          placeholder="Téléphone"
          value={data.telephone}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="text"
          name="nin"
          placeholder="NIN"
          value={data.nin}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
