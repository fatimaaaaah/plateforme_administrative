import React, { useState } from 'react';
import { FaUser, FaShieldAlt } from 'react-icons/fa';

export default function LoginPage() {
  const [role, setRole] = useState('citoyen');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50">
      <div className="text-center mb-6">
        <div className="text-green-600 text-5xl mb-2">📄</div>
        <h1 className="text-2xl font-bold">Connexion</h1>
        <p className="text-gray-600">Accédez à votre espace personnel</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          <button
            className={`flex-1 px-4 py-2 border rounded-l-lg ${role === 'citoyen' ? 'bg-white text-black border-b-2 border-green-600' : 'bg-gray-100 text-gray-500'}`}
            onClick={() => setRole('citoyen')}
          >
            <FaUser className="inline-block mr-2" />
            Citoyen
          </button>
          <button
            className={`flex-1 px-4 py-2 border rounded-r-lg ${role === 'agent' ? 'bg-white text-black border-b-2 border-green-600' : 'bg-gray-100 text-gray-500'}`}
            onClick={() => setRole('agent')}
          >
            <FaShieldAlt className="inline-block mr-2" />
            Agent
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-1">
          {role === 'citoyen' ? 'Espace Citoyen' : 'Espace Agent'}
        </h2>
        <p className="text-gray-500 mb-4">
          {role === 'citoyen'
            ? 'Connectez-vous pour accéder à vos demandes'
            : 'Accès réservé aux agents administratifs'}
        </p>

        <form>
          {role === 'citoyen' ? (
            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
            />
          ) : (
            <input
              type="text"
              placeholder="Identifiant agent (ex: AGT-0001)"
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
            />
          )}

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Se connecter
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-green-600 text-sm">Mot de passe oublié ?</a><br />
          {role === 'citoyen' && (
            <>
              <span className="text-sm text-gray-600">Pas encore de compte ? </span>
              <a href="#" className="text-green-700 font-medium text-sm">S’inscrire</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
