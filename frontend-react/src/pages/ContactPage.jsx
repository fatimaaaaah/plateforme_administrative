import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message envoyé :", form);
    alert("Merci ! Votre message a été transmis (simulation).");
    setForm({ nom: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
      <Navbar />

      <div className="container mx-auto px-4 py-16 max-w-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Contactez-nous</h1>

        <p className="text-center text-gray-600 mb-8">
          Besoin d’aide ? Écrivez‑nous via ce formulaire ou appelez le <strong>+221 33 XXX XX XX</strong>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow">
          <input
            type="text"
            name="nom"
            placeholder="Votre nom"
            value={form.nom}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Votre e‑mail"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Votre message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded"
          >
            Envoyer le message
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
