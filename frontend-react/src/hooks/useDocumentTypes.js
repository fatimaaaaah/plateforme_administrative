import { useEffect, useState } from "react";

const useDocumentTypes = () => {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Données locales simulées (mock)
    const mockData = [
      {
        id: "acte_naissance",
        nom: "Acte de naissance",
        prix: 2000,
        delaiTraitement: 3,
        documentsRequis: ["Photocopie de la pièce d'identité", "Justificatif de domicile"]
      },
      {
        id: "certificat_residence",
        nom: "Certificat de résidence",
        prix: 3000,
        delaiTraitement: 5,
        documentsRequis: ["Facture SENELEC", "Carte d'identité"]
      },
      {
        id: "casier_judiciaire",
        nom: "Extrait de casier judiciaire",
        prix: 2500,
        delaiTraitement: 4,
        documentsRequis: ["Carte nationale d'identité"]
      }
    ];

    // Simule un délai de chargement
    setTimeout(() => {
      setDocumentTypes(mockData);
      setLoading(false);
    }, 500);
  }, []);

  return { documentTypes, loading };
};

export default useDocumentTypes;
