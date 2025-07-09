import { useState, useEffect } from "react";

const STATIC_DOCUMENT_TYPES = [
  {
    id: "DOC-001",
    nom: "Extrait de naissance",
    prix: 2500,
    description: "Document officiel attestant de la naissance.",
  },
  {
    id: "DOC-002",
    nom: "Certificat de nationalité",
    prix: 5000,
    description: "Preuve de la nationalité sénégalaise.",
  },
  {
    id: "DOC-003",
    nom: "Casier judiciaire",
    prix: 10000,
    description: "Atteste de la situation judiciaire d'un individu.",
  },
  {
    id: "DOC-004",
    nom: "Certificat de résidence",
    prix: 1500,
    description: "Justifie l'adresse de résidence de l'usager.",
  },
];

export function useDocumentTypes() {
  const [documentTypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDocumentTypes(STATIC_DOCUMENT_TYPES);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { documentTypes };
}