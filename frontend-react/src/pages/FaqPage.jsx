import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const questions = [
  {
    q: "Comment créer un compte ?",
    a: "Cliquez sur « Créer un compte » puis remplissez le formulaire d’inscription."
  },
  {
    q: "Quels documents puis‑je demander ?",
    a: "Extrait de naissance, casier judiciaire, certificat de nationalité… La liste s’agrandit régulièrement."
  },
  {
    q: "Combien de temps pour recevoir mon document ?",
    a: "Le délai moyen est de 48 h mais peut varier selon la complexité du dossier."
  }
];

export default function FaqPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-10">Foire aux questions</h1>

        <div className="max-w-3xl mx-auto space-y-4">
          {questions.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg shadow transition hover:shadow-md">
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-gray-800 hover:text-green-600 focus:outline-none"
              >
                <span>{item.q}</span>
                <span className="text-xl">{open === idx ? "−" : "+"}</span>
              </button>
              {open === idx && (
                <div className="px-5 pb-4 text-gray-600">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
